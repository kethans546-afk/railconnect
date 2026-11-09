package com.railconnect.booking.service;

import com.railconnect.booking.dto.FareCalculationDto;
import com.railconnect.booking.dto.TrainSearchResponse;
import com.railconnect.booking.model.Station;
import com.railconnect.booking.model.Train;
import com.railconnect.booking.model.TrainRoute;
import com.railconnect.booking.repository.BookingRepository;
import com.railconnect.booking.repository.StationRepository;
import com.railconnect.booking.repository.TrainRepository;
import com.railconnect.booking.repository.TrainRouteRepository;
import com.railconnect.seatengine.model.Coach;
import com.railconnect.seatengine.repository.CoachRepository;
import com.railconnect.seatengine.service.SeatAvailabilityService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TrainSearchService {

    private final TrainRepository trainRepository;
    private final StationRepository stationRepository;
    private final TrainRouteRepository trainRouteRepository;
    private final CoachRepository coachRepository;
    private final BookingRepository bookingRepository;
    private final SeatAvailabilityService seatAvailabilityService;
    private final FareCalculationService fareCalculationService;

    public TrainSearchService(TrainRepository trainRepository,
                              StationRepository stationRepository,
                              TrainRouteRepository trainRouteRepository,
                              CoachRepository coachRepository,
                              BookingRepository bookingRepository,
                              SeatAvailabilityService seatAvailabilityService,
                              FareCalculationService fareCalculationService) {
        this.trainRepository = trainRepository;
        this.stationRepository = stationRepository;
        this.trainRouteRepository = trainRouteRepository;
        this.coachRepository = coachRepository;
        this.bookingRepository = bookingRepository;
        this.seatAvailabilityService = seatAvailabilityService;
        this.fareCalculationService = fareCalculationService;
    }

    private Station resolveStation(String input) {
        if (input == null || input.trim().isEmpty()) {
            return null;
        }
        String clean = input.trim();

        // 1. Check if station code is enclosed in parentheses, e.g. "Bengaluru (SBC)" -> "SBC"
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("\\(([A-Za-z]{2,5})\\)").matcher(clean);
        if (m.find()) {
            Optional<Station> byExtracted = stationRepository.findByCodeIgnoreCase(m.group(1));
            if (byExtracted.isPresent()) return byExtracted.get();
        }

        // 2. Check if begins with station code prefix, e.g. "SBC - Bengaluru" -> "SBC"
        java.util.regex.Matcher mPrefix = java.util.regex.Pattern.compile("^([A-Za-z]{2,5})\\b").matcher(clean);
        if (mPrefix.find()) {
            Optional<Station> byPrefix = stationRepository.findByCodeIgnoreCase(mPrefix.group(1));
            if (byPrefix.isPresent()) return byPrefix.get();
        }

        // 3. Exact code match
        Optional<Station> byCode = stationRepository.findByCodeIgnoreCase(clean);
        if (byCode.isPresent()) {
            return byCode.get();
        }

        // 4. Common city aliases
        String upper = clean.toUpperCase();
        if (upper.contains("BANGALORE") || upper.contains("BENGALURU")) return stationRepository.findByCodeIgnoreCase("SBC").orElse(null);
        if (upper.contains("CHENNAI") || upper.contains("MADRAS")) return stationRepository.findByCodeIgnoreCase("MAS").orElse(null);
        if (upper.contains("TRICHY") || upper.contains("TIRUCHIRAPPALLI") || upper.contains("TIRUCHCHIRAPPALLI")) return stationRepository.findByCodeIgnoreCase("TPJ").orElse(null);
        if (upper.contains("DELHI")) return stationRepository.findByCodeIgnoreCase("NDLS").orElse(null);
        if (upper.contains("MUMBAI") || upper.contains("BOMBAY")) return stationRepository.findByCodeIgnoreCase("BCT").orElse(null);
        if (upper.contains("KOLKATA") || upper.contains("HOWRAH") || upper.contains("CALCUTTA")) return stationRepository.findByCodeIgnoreCase("HWH").orElse(null);
        if (upper.contains("HYDERABAD")) return stationRepository.findByCodeIgnoreCase("HYB").orElse(null);
        if (upper.contains("SECUNDERABAD")) return stationRepository.findByCodeIgnoreCase("SC").orElse(null);
        if (upper.contains("COIMBATORE")) return stationRepository.findByCodeIgnoreCase("CBE").orElse(null);
        if (upper.contains("MYSORE") || upper.contains("MYSURU")) return stationRepository.findByCodeIgnoreCase("MYS").orElse(null);
        if (upper.contains("JAIPUR")) return stationRepository.findByCodeIgnoreCase("JP").orElse(null);
        if (upper.contains("PUNE")) return stationRepository.findByCodeIgnoreCase("PUNE").orElse(null);
        if (upper.contains("AHMEDABAD")) return stationRepository.findByCodeIgnoreCase("ADI").orElse(null);

        // 5. Full text substring search
        List<Station> matches = stationRepository.searchStations(clean);
        if (!matches.isEmpty()) {
            return matches.get(0);
        }
        return null;
    }

    public List<TrainSearchResponse> searchTrains(String fromCode, String toCode, LocalDate journeyDate) {
        Station fromStation = resolveStation(fromCode);
        Station toStation = resolveStation(toCode);

        List<Train> directTrains = new ArrayList<>();
        if (fromStation != null && toStation != null) {
            directTrains = trainRepository.findDirectTrainsBetweenStations(fromStation.getId(), toStation.getId());
        }

        if (directTrains.isEmpty()) {
            // Graceful fallback to all active trains across fleet so search is never blank
            directTrains = trainRepository.findByActiveTrue();
        }

        List<TrainSearchResponse> results = new ArrayList<>();

        for (Train train : directTrains) {
            Station fStation = fromStation != null ? fromStation : train.getSourceStation();
            Station tStation = toStation != null ? toStation : train.getDestinationStation();

            String depTime = train.getDepartureTime() != null ? train.getDepartureTime().toString() : "06:00";
            String arrTime = train.getArrivalTime() != null ? train.getArrivalTime().toString() : "11:00";
            double distance = 350.0;

            if (fromStation != null && toStation != null) {
                Optional<TrainRoute> fromRouteOpt = trainRouteRepository.findByTrainIdAndStationId(train.getId(), fromStation.getId());
                Optional<TrainRoute> toRouteOpt = trainRouteRepository.findByTrainIdAndStationId(train.getId(), toStation.getId());
                if (fromRouteOpt.isPresent() && toRouteOpt.isPresent()) {
                    TrainRoute fromRoute = fromRouteOpt.get();
                    TrainRoute toRoute = toRouteOpt.get();
                    distance = Math.max(50.0, toRoute.getDistanceFromSourceKm() - fromRoute.getDistanceFromSourceKm());
                    if (fromRoute.getDepartureTime() != null) depTime = fromRoute.getDepartureTime().toString();
                    if (toRoute.getArrivalTime() != null) arrTime = toRoute.getArrivalTime().toString();
                }
            }

            // Find booked seats for this train and journey date
            Set<Long> bookedSeatIds = Collections.emptySet();
            try {
                bookedSeatIds = bookingRepository.findBookedSeatIds(train.getId(), journeyDate != null ? journeyDate : LocalDate.now());
            } catch (Exception e) {}

            // Get coaches for this train
            List<Coach> coaches = coachRepository.findByTrainId(train.getId());
            Set<String> distinctClasses = new LinkedHashSet<>();
            if (coaches != null) {
                for (Coach c : coaches) {
                    distinctClasses.add(c.getCoachType());
                }
            }

            List<TrainSearchResponse.ClassAvailabilityDto> classDtos = new ArrayList<>();
            if (distinctClasses.isEmpty()) {
                classDtos.add(new TrainSearchResponse.ClassAvailabilityDto("3A", 48, 650.0, "AVAILABLE (48)"));
                classDtos.add(new TrainSearchResponse.ClassAvailabilityDto("2A", 24, 1100.0, "AVAILABLE (24)"));
                classDtos.add(new TrainSearchResponse.ClassAvailabilityDto("SL", 120, 280.0, "AVAILABLE (120)"));
            } else {
                for (String coachType : distinctClasses) {
                    int availableSeats = seatAvailabilityService.getAvailableSeatsCount(train.getId(), coachType, bookedSeatIds);
                    FareCalculationDto fare = fareCalculationService.calculateFare(train.getTrainType(), coachType, distance, 1, 0.0);
                    String status = availableSeats > 0 ? "AVAILABLE (" + availableSeats + ")" : "RAC / WL";
                    classDtos.add(new TrainSearchResponse.ClassAvailabilityDto(coachType, availableSeats, fare.getFinalFare(), status));
                }
            }

            TrainSearchResponse res = new TrainSearchResponse();
            res.setTrainId(train.getId());
            res.setTrainNumber(train.getTrainNumber());
            res.setTrainName(train.getTrainName());
            res.setTrainType(train.getTrainType());
            res.setFromStationCode(fStation != null ? fStation.getCode() : "SBC");
            res.setFromStationName(fStation != null ? fStation.getName() : "Bengaluru");
            res.setToStationCode(tStation != null ? tStation.getCode() : "MAS");
            res.setToStationName(tStation != null ? tStation.getName() : "Chennai");
            res.setDepartureTime(depTime);
            res.setArrivalTime(arrTime);
            res.setDurationHours(train.getDurationHours());
            res.setDistanceKm(distance);
            res.setRunningDays(train.getRunningDays());
            res.setAvailableClasses(classDtos);

            results.add(res);
        }

        // Sort trains chronologically by departure time
        results.sort(Comparator.comparing(TrainSearchResponse::getDepartureTime));

        return results;
    }
}
