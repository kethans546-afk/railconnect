package com.railconnect.config;

import com.railconnect.auth.model.User;
import com.railconnect.auth.repository.UserRepository;
import com.railconnect.berthexchange.model.BerthExchangeRequest;
import com.railconnect.berthexchange.model.ExchangeStatus;
import com.railconnect.berthexchange.repository.ExchangeRepository;
import com.railconnect.booking.model.*;
import com.railconnect.booking.repository.*;
import com.railconnect.seatengine.model.BerthType;
import com.railconnect.seatengine.model.Coach;
import com.railconnect.seatengine.model.Seat;
import com.railconnect.seatengine.repository.CoachRepository;
import com.railconnect.seatengine.repository.SeatRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StationRepository stationRepository;
    private final TrainRepository trainRepository;
    private final TrainRouteRepository trainRouteRepository;
    private final CoachRepository coachRepository;
    private final SeatRepository seatRepository;
    private final FareRuleRepository fareRuleRepository;
    private final BookingRepository bookingRepository;
    private final BookingPassengerRepository passengerRepository;
    private final PaymentRepository paymentRepository;
    private final ExchangeRepository exchangeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository,
                      StationRepository stationRepository,
                      TrainRepository trainRepository,
                      TrainRouteRepository trainRouteRepository,
                      CoachRepository coachRepository,
                      SeatRepository seatRepository,
                      FareRuleRepository fareRuleRepository,
                      BookingRepository bookingRepository,
                      BookingPassengerRepository passengerRepository,
                      PaymentRepository paymentRepository,
                      ExchangeRepository exchangeRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.stationRepository = stationRepository;
        this.trainRepository = trainRepository;
        this.trainRouteRepository = trainRouteRepository;
        this.coachRepository = coachRepository;
        this.seatRepository = seatRepository;
        this.fareRuleRepository = fareRuleRepository;
        this.bookingRepository = bookingRepository;
        this.passengerRepository = passengerRepository;
        this.paymentRepository = paymentRepository;
        this.exchangeRepository = exchangeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (stationRepository.count() > 0) {
            return; // Data already initialized
        }

        System.out.println(">>> RailConnect: Bootstrapping comprehensive master railway network & realistic scenarios...");

        // 1. Users
        String encodedPass = passwordEncoder.encode("password123");
        String kethanPass = passwordEncoder.encode("Kethan2007");
        User admin = userRepository.save(new User("ks9312", "ks9312@railconnect.com", "9876543299", kethanPass, "ROLE_ADMIN", "Kethan", "Admin"));
        userRepository.save(new User("admin", "admin@railconnect.com", "9876543298", encodedPass, "ROLE_ADMIN", "Rajesh", "Verma"));
        User inspector = userRepository.save(new User("inspector_anand", "inspector@railconnect.com", "9876543288", encodedPass, "ROLE_INSPECTOR", "Anand", "Mohan"));
        User rahul = userRepository.save(new User("rahul_sharma", "rahul@railconnect.com", "9876543210", encodedPass, "ROLE_PASSENGER", "Rahul", "Sharma"));
        User priya = userRepository.save(new User("priya_patel", "priya@railconnect.com", "9876543211", encodedPass, "ROLE_PASSENGER", "Priya", "Patel"));
        User suresh = userRepository.save(new User("suresh_kumar", "suresh@railconnect.com", "9876543212", encodedPass, "ROLE_PASSENGER", "Suresh", "Kumar"));

        // 2. Stations (24 Major Railway Stations across India)
        Station ndls = stationRepository.save(new Station("NDLS", "New Delhi Railway Station", "New Delhi", "Delhi", "NR", 16));
        Station bct = stationRepository.save(new Station("BCT", "Mumbai Central", "Mumbai", "Maharashtra", "WR", 8));
        Station csmt = stationRepository.save(new Station("CSMT", "Chhatrapati Shivaji Maharaj Terminus", "Mumbai", "Maharashtra", "CR", 18));
        Station mas = stationRepository.save(new Station("MAS", "Chennai Central", "Chennai", "Tamil Nadu", "SR", 12));
        Station ms = stationRepository.save(new Station("MS", "Chennai Egmore", "Chennai", "Tamil Nadu", "SR", 11));
        Station sbc = stationRepository.save(new Station("SBC", "KSR Bengaluru City Junction", "Bengaluru", "Karnataka", "SWR", 10));
        Station mys = stationRepository.save(new Station("MYS", "Mysuru Junction", "Mysuru", "Karnataka", "SWR", 6));
        Station hwh = stationRepository.save(new Station("HWH", "Howrah Junction", "Kolkata", "West Bengal", "ER", 23));
        Station hyb = stationRepository.save(new Station("HYB", "Hyderabad Deccan", "Hyderabad", "Telangana", "SCR", 6));
        Station sc = stationRepository.save(new Station("SC", "Secunderabad Junction", "Hyderabad", "Telangana", "SCR", 10));
        Station adi = stationRepository.save(new Station("ADI", "Ahmedabad Junction", "Ahmedabad", "Gujarat", "WR", 12));
        Station cnb = stationRepository.save(new Station("CNB", "Kanpur Central", "Kanpur", "Uttar Pradesh", "NCR", 10));
        Station bsb = stationRepository.save(new Station("BSB", "Varanasi Junction", "Varanasi", "Uttar Pradesh", "NR", 9));
        Station lko = stationRepository.save(new Station("LKO", "Lucknow Charbagh", "Lucknow", "Uttar Pradesh", "NR", 9));
        Station pnbe = stationRepository.save(new Station("PNBE", "Patna Junction", "Patna", "Bihar", "ECR", 10));
        Station tpj = stationRepository.save(new Station("TPJ", "Tiruchchirappalli Junction (Trichy)", "Tiruchirappalli", "Tamil Nadu", "SR", 8));
        Station kpd = stationRepository.save(new Station("KPD", "Katpadi Junction", "Vellore", "Tamil Nadu", "SR", 5));
        Station cbe = stationRepository.save(new Station("CBE", "Coimbatore Junction", "Coimbatore", "Tamil Nadu", "SR", 6));
        Station pune = stationRepository.save(new Station("PUNE", "Pune Junction", "Pune", "Maharashtra", "CR", 6));
        Station jp = stationRepository.save(new Station("JP", "Jaipur Junction", "Jaipur", "Rajasthan", "NWR", 8));
        Station bpl = stationRepository.save(new Station("BPL", "Bhopal Junction", "Bhopal", "Madhya Pradesh", "WCR", 6));
        Station tvc = stationRepository.save(new Station("TVC", "Thiruvananthapuram Central", "Thiruvananthapuram", "Kerala", "SR", 5));
        Station gkp = stationRepository.save(new Station("GKP", "Gorakhpur Junction", "Gorakhpur", "Uttar Pradesh", "NER", 10));
        Station asr = stationRepository.save(new Station("ASR", "Amritsar Junction", "Amritsar", "Punjab", "NR", 7));

        // 3. Fare Rules
        fareRuleRepository.save(new FareRule("EXPRESS", "SL", 0.45, 20.0, 30.0, 0.0));
        fareRuleRepository.save(new FareRule("EXPRESS", "3A", 1.25, 40.0, 45.0, 5.0));
        fareRuleRepository.save(new FareRule("EXPRESS", "2A", 1.80, 50.0, 45.0, 5.0));
        fareRuleRepository.save(new FareRule("EXPRESS", "1A", 2.80, 60.0, 75.0, 5.0));
        fareRuleRepository.save(new FareRule("EXPRESS", "CC", 0.95, 40.0, 45.0, 5.0));
        fareRuleRepository.save(new FareRule("VANDE_BHARAT", "CC", 1.45, 40.0, 75.0, 5.0));
        fareRuleRepository.save(new FareRule("VANDE_BHARAT", "EC", 2.65, 60.0, 75.0, 5.0));
        fareRuleRepository.save(new FareRule("RAJDHANI", "3A", 1.45, 40.0, 75.0, 5.0));
        fareRuleRepository.save(new FareRule("RAJDHANI", "2A", 2.10, 50.0, 75.0, 5.0));
        fareRuleRepository.save(new FareRule("RAJDHANI", "1A", 3.10, 60.0, 75.0, 5.0));
        fareRuleRepository.save(new FareRule("SHATABDI", "CC", 1.20, 40.0, 45.0, 5.0));
        fareRuleRepository.save(new FareRule("SHATABDI", "EC", 2.30, 60.0, 75.0, 5.0));

        // 4. Comprehensive Fleet of 30 Trains with realistic Multi-Stop Routes
        // --- VANDE BHARAT FLEET ---
        Train vb1 = registerTrainWithStops("20608", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(5, 45), LocalTime.of(10, 10), 4.42, "MON,TUE,WED,THU,FRI,SUN",
                List.of(
                        new StopDef(sbc, 0.0, null, LocalTime.of(5, 45)),
                        new StopDef(kpd, 229.0, LocalTime.of(8, 30), LocalTime.of(8, 32)),
                        new StopDef(mas, 359.0, LocalTime.of(10, 10), null)
                ));

        registerTrainWithStops("20607", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(5, 50), LocalTime.of(12, 20), 6.5, "MON,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(mas, 0.0, null, LocalTime.of(5, 50)),
                        new StopDef(kpd, 130.0, LocalTime.of(7, 13), LocalTime.of(7, 15)),
                        new StopDef(sbc, 359.0, LocalTime.of(10, 15), LocalTime.of(10, 20)),
                        new StopDef(mys, 497.0, LocalTime.of(12, 20), null)
                ));

        registerTrainWithStops("22436", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(6, 0), LocalTime.of(14, 0), 8.0, "TUE,WED,FRI,SAT,SUN",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(6, 0)),
                        new StopDef(cnb, 440.0, LocalTime.of(10, 8), LocalTime.of(10, 12)),
                        new StopDef(bsb, 759.0, LocalTime.of(14, 0), null)
                ));

        registerTrainWithStops("22435", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(15, 0), LocalTime.of(23, 0), 8.0, "TUE,WED,FRI,SAT,SUN",
                List.of(
                        new StopDef(bsb, 0.0, null, LocalTime.of(15, 0)),
                        new StopDef(cnb, 319.0, LocalTime.of(18, 30), LocalTime.of(18, 34)),
                        new StopDef(ndls, 759.0, LocalTime.of(23, 0), null)
                ));

        registerTrainWithStops("20901", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(6, 10), LocalTime.of(11, 25), 5.25, "MON,TUE,WED,THU,FRI,SAT",
                List.of(
                        new StopDef(bct, 0.0, null, LocalTime.of(6, 10)),
                        new StopDef(adi, 491.0, LocalTime.of(11, 25), null)
                ));

        registerTrainWithStops("20902", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(15, 0), LocalTime.of(20, 25), 5.4, "MON,TUE,WED,THU,FRI,SAT",
                List.of(
                        new StopDef(adi, 0.0, null, LocalTime.of(15, 0)),
                        new StopDef(bct, 491.0, LocalTime.of(20, 25), null)
                ));

        registerTrainWithStops("20641", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(14, 20), LocalTime.of(20, 45), 6.4, "MON,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(sbc, 0.0, null, LocalTime.of(14, 20)),
                        new StopDef(cbe, 378.0, LocalTime.of(20, 45), null)
                ));

        registerTrainWithStops("20642", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(5, 0), LocalTime.of(11, 30), 6.5, "MON,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(cbe, 0.0, null, LocalTime.of(5, 0)),
                        new StopDef(sbc, 378.0, LocalTime.of(11, 30), null)
                ));

        registerTrainWithStops("20631", "Vande Bharat Express", "VANDE_BHARAT",
                LocalTime.of(6, 0), LocalTime.of(11, 50), 5.8, "MON,TUE,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(cbe, 0.0, null, LocalTime.of(6, 0)),
                        new StopDef(kpd, 370.0, LocalTime.of(10, 10), LocalTime.of(10, 12)),
                        new StopDef(mas, 497.0, LocalTime.of(11, 50), null)
                ));

        // --- RAJDHANI FLEET ---
        Train rajdhani = registerTrainWithStops("12952", "Mumbai Rajdhani Express", "RAJDHANI",
                LocalTime.of(16, 55), LocalTime.of(8, 35), 15.67, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(16, 55)),
                        new StopDef(cnb, 440.0, LocalTime.of(21, 30), LocalTime.of(21, 35)),
                        new StopDef(adi, 935.0, LocalTime.of(3, 15), LocalTime.of(3, 25)),
                        new StopDef(bct, 1384.0, LocalTime.of(8, 35), null)
                ));

        registerTrainWithStops("12951", "New Delhi Rajdhani Express", "RAJDHANI",
                LocalTime.of(17, 0), LocalTime.of(8, 32), 15.5, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(bct, 0.0, null, LocalTime.of(17, 0)),
                        new StopDef(adi, 449.0, LocalTime.of(22, 10), LocalTime.of(22, 20)),
                        new StopDef(cnb, 944.0, LocalTime.of(4, 0), LocalTime.of(4, 5)),
                        new StopDef(ndls, 1384.0, LocalTime.of(8, 32), null)
                ));

        registerTrainWithStops("12301", "Howrah Rajdhani Express", "RAJDHANI",
                LocalTime.of(16, 50), LocalTime.of(10, 5), 17.25, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(hwh, 0.0, null, LocalTime.of(16, 50)),
                        new StopDef(cnb, 1010.0, LocalTime.of(4, 45), LocalTime.of(4, 50)),
                        new StopDef(ndls, 1450.0, LocalTime.of(10, 5), null)
                ));

        registerTrainWithStops("12302", "New Delhi Howrah Rajdhani", "RAJDHANI",
                LocalTime.of(16, 55), LocalTime.of(9, 55), 17.0, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(16, 55)),
                        new StopDef(cnb, 440.0, LocalTime.of(21, 30), LocalTime.of(21, 35)),
                        new StopDef(hwh, 1450.0, LocalTime.of(9, 55), null)
                ));

        registerTrainWithStops("22691", "Bengaluru Rajdhani Express", "RAJDHANI",
                LocalTime.of(20, 0), LocalTime.of(5, 30), 33.5, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(sbc, 0.0, null, LocalTime.of(20, 0)),
                        new StopDef(sc, 621.0, LocalTime.of(7, 0), LocalTime.of(7, 15)),
                        new StopDef(bpl, 1500.0, LocalTime.of(20, 0), LocalTime.of(20, 5)),
                        new StopDef(ndls, 2200.0, LocalTime.of(5, 30), null)
                ));

        registerTrainWithStops("22692", "New Delhi Bengaluru Rajdhani", "RAJDHANI",
                LocalTime.of(20, 45), LocalTime.of(6, 40), 33.9, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(20, 45)),
                        new StopDef(bpl, 700.0, LocalTime.of(5, 20), LocalTime.of(5, 25)),
                        new StopDef(sc, 1579.0, LocalTime.of(18, 0), LocalTime.of(18, 15)),
                        new StopDef(sbc, 2200.0, LocalTime.of(6, 40), null)
                ));

        registerTrainWithStops("12433", "Chennai Rajdhani Express", "RAJDHANI",
                LocalTime.of(6, 10), LocalTime.of(10, 40), 28.5, "FRI,SUN",
                List.of(
                        new StopDef(mas, 0.0, null, LocalTime.of(6, 10)),
                        new StopDef(bpl, 1475.0, LocalTime.of(2, 50), LocalTime.of(2, 55)),
                        new StopDef(ndls, 2175.0, LocalTime.of(10, 40), null)
                ));

        registerTrainWithStops("12434", "New Delhi Chennai Rajdhani", "RAJDHANI",
                LocalTime.of(15, 35), LocalTime.of(20, 45), 29.1, "WED,FRI",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(15, 35)),
                        new StopDef(bpl, 700.0, LocalTime.of(23, 20), LocalTime.of(23, 25)),
                        new StopDef(mas, 2175.0, LocalTime.of(20, 45), null)
                ));

        // --- SHATABDI FLEET ---
        registerTrainWithStops("12007", "Chennai Mysuru Shatabdi", "SHATABDI",
                LocalTime.of(6, 0), LocalTime.of(13, 0), 7.0, "MON,TUE,WED,FRI,SAT,SUN",
                List.of(
                        new StopDef(mas, 0.0, null, LocalTime.of(6, 0)),
                        new StopDef(kpd, 130.0, LocalTime.of(7, 38), LocalTime.of(7, 40)),
                        new StopDef(sbc, 359.0, LocalTime.of(10, 45), LocalTime.of(10, 50)),
                        new StopDef(mys, 497.0, LocalTime.of(13, 0), null)
                ));

        registerTrainWithStops("12008", "Mysuru Chennai Shatabdi", "SHATABDI",
                LocalTime.of(14, 15), LocalTime.of(21, 30), 7.25, "MON,TUE,WED,FRI,SAT,SUN",
                List.of(
                        new StopDef(mys, 0.0, null, LocalTime.of(14, 15)),
                        new StopDef(sbc, 138.0, LocalTime.of(16, 15), LocalTime.of(16, 20)),
                        new StopDef(kpd, 367.0, LocalTime.of(19, 23), LocalTime.of(19, 25)),
                        new StopDef(mas, 497.0, LocalTime.of(21, 30), null)
                ));

        registerTrainWithStops("12028", "KSR Bengaluru Chennai Shatabdi", "SHATABDI",
                LocalTime.of(6, 0), LocalTime.of(11, 0), 5.0, "MON,TUE,WED,THU,FRI,SUN",
                List.of(
                        new StopDef(sbc, 0.0, null, LocalTime.of(6, 0)),
                        new StopDef(kpd, 229.0, LocalTime.of(9, 10), LocalTime.of(9, 12)),
                        new StopDef(mas, 359.0, LocalTime.of(11, 0), null)
                ));

        registerTrainWithStops("12027", "Chennai KSR Bengaluru Shatabdi", "SHATABDI",
                LocalTime.of(17, 30), LocalTime.of(22, 25), 4.9, "MON,TUE,WED,THU,FRI,SUN",
                List.of(
                        new StopDef(mas, 0.0, null, LocalTime.of(17, 30)),
                        new StopDef(kpd, 130.0, LocalTime.of(19, 10), LocalTime.of(19, 12)),
                        new StopDef(sbc, 359.0, LocalTime.of(22, 25), null)
                ));

        registerTrainWithStops("12004", "Lucknow Shatabdi Express", "SHATABDI",
                LocalTime.of(6, 10), LocalTime.of(12, 40), 6.5, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(6, 10)),
                        new StopDef(cnb, 440.0, LocalTime.of(11, 20), LocalTime.of(11, 25)),
                        new StopDef(lko, 512.0, LocalTime.of(12, 40), null)
                ));

        registerTrainWithStops("12003", "New Delhi Shatabdi Express", "SHATABDI",
                LocalTime.of(15, 30), LocalTime.of(22, 20), 6.8, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(lko, 0.0, null, LocalTime.of(15, 30)),
                        new StopDef(cnb, 72.0, LocalTime.of(16, 50), LocalTime.of(16, 55)),
                        new StopDef(ndls, 512.0, LocalTime.of(22, 20), null)
                ));

        // --- SUPERFAST & EXPRESS FLEET ---
        Train pandian = registerTrainWithStops("12638", "Pandian Superfast Express", "EXPRESS",
                LocalTime.of(21, 35), LocalTime.of(5, 15), 7.67, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(tpj, 0.0, null, LocalTime.of(21, 35)),
                        new StopDef(ms, 336.0, LocalTime.of(4, 55), LocalTime.of(5, 0)),
                        new StopDef(mas, 340.0, LocalTime.of(5, 15), null)
                ));

        registerTrainWithStops("12637", "Pandian Superfast Express", "EXPRESS",
                LocalTime.of(21, 40), LocalTime.of(5, 35), 7.9, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(mas, 0.0, null, LocalTime.of(21, 40)),
                        new StopDef(ms, 4.0, LocalTime.of(21, 50), LocalTime.of(21, 55)),
                        new StopDef(tpj, 340.0, LocalTime.of(5, 35), null)
                ));

        registerTrainWithStops("12245", "Howrah Yesvantpur Duronto", "EXPRESS",
                LocalTime.of(10, 50), LocalTime.of(16, 0), 29.1, "TUE,WED,FRI,SAT,SUN",
                List.of(
                        new StopDef(hwh, 0.0, null, LocalTime.of(10, 50)),
                        new StopDef(sbc, 1946.0, LocalTime.of(16, 0), null)
                ));

        registerTrainWithStops("12723", "Telangana Superfast Express", "EXPRESS",
                LocalTime.of(6, 0), LocalTime.of(7, 40), 25.6, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(hyb, 0.0, null, LocalTime.of(6, 0)),
                        new StopDef(sc, 9.0, LocalTime.of(6, 20), LocalTime.of(6, 25)),
                        new StopDef(bpl, 980.0, LocalTime.of(21, 10), LocalTime.of(21, 15)),
                        new StopDef(ndls, 1677.0, LocalTime.of(7, 40), null)
                ));

        registerTrainWithStops("12724", "New Delhi Telangana Express", "EXPRESS",
                LocalTime.of(16, 0), LocalTime.of(17, 10), 25.1, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(ndls, 0.0, null, LocalTime.of(16, 0)),
                        new StopDef(bpl, 697.0, LocalTime.of(2, 0), LocalTime.of(2, 5)),
                        new StopDef(sc, 1668.0, LocalTime.of(16, 40), LocalTime.of(16, 45)),
                        new StopDef(hyb, 1677.0, LocalTime.of(17, 10), null)
                ));

        registerTrainWithStops("12137", "Punjab Mail Superfast", "EXPRESS",
                LocalTime.of(19, 35), LocalTime.of(21, 30), 25.9, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(csmt, 0.0, null, LocalTime.of(19, 35)),
                        new StopDef(pune, 192.0, LocalTime.of(23, 10), LocalTime.of(23, 15)),
                        new StopDef(bpl, 1025.0, LocalTime.of(12, 10), LocalTime.of(12, 15)),
                        new StopDef(ndls, 1540.0, LocalTime.of(21, 30), null)
                ));

        registerTrainWithStops("16589", "Rani Chennamma Express", "EXPRESS",
                LocalTime.of(23, 0), LocalTime.of(14, 15), 15.25, "MON,TUE,WED,THU,FRI,SAT,SUN",
                List.of(
                        new StopDef(sbc, 0.0, null, LocalTime.of(23, 0)),
                        new StopDef(pune, 927.0, LocalTime.of(14, 15), null)
                ));

        // 5. Demo Bookings with unique 10-digit PNR
        Booking booking1 = new Booking();
        booking1.setPnrNumber("4827193056");
        booking1.setUser(rahul);
        booking1.setTrain(pandian);
        booking1.setFromStation(tpj);
        booking1.setToStation(mas);
        booking1.setJourneyDate(LocalDate.now().plusDays(2));
        booking1.setCoachType("3A");
        booking1.setBaseFare(420.0);
        booking1.setReservationCharge(40.0);
        booking1.setServiceCharge(45.0);
        booking1.setTaxAmount(25.0);
        booking1.setDiscountAmount(0.0);
        booking1.setTotalFare(530.0);
        booking1.setStatus(BookingStatus.CONFIRMED);
        Booking savedB1 = bookingRepository.save(booking1);

        BookingPassenger pRahul = new BookingPassenger("Rahul Sharma", 29, "MALE", "LOWER");
        pRahul.setBooking(savedB1);
        pRahul.setSeatId(1L);
        pRahul.setAllocatedCoach("B1");
        pRahul.setAllocatedSeatNumber(1);
        pRahul.setAllocatedBerthType("LOWER");
        pRahul.setStatus(BookingStatus.CONFIRMED);
        passengerRepository.save(pRahul);

        paymentRepository.save(new Payment(savedB1, "TXN-RAIL-2026-001", "UPI", 530.0, "SUCCESS"));

        // Booking 2: Priya Patel on same train & date (Eligible for exchange!)
        Booking booking2 = new Booking();
        booking2.setPnrNumber("8192304851");
        booking2.setUser(priya);
        booking2.setTrain(pandian);
        booking2.setFromStation(tpj);
        booking2.setToStation(mas);
        booking2.setJourneyDate(LocalDate.now().plusDays(2));
        booking2.setCoachType("3A");
        booking2.setBaseFare(420.0);
        booking2.setReservationCharge(40.0);
        booking2.setServiceCharge(45.0);
        booking2.setTaxAmount(25.0);
        booking2.setDiscountAmount(0.0);
        booking2.setTotalFare(530.0);
        booking2.setStatus(BookingStatus.CONFIRMED);
        Booking savedB2 = bookingRepository.save(booking2);

        BookingPassenger pPriya = new BookingPassenger("Priya Patel", 27, "FEMALE", "UPPER");
        pPriya.setBooking(savedB2);
        pPriya.setSeatId(3L);
        pPriya.setAllocatedCoach("B1");
        pPriya.setAllocatedSeatNumber(3);
        pPriya.setAllocatedBerthType("UPPER");
        pPriya.setStatus(BookingStatus.CONFIRMED);
        passengerRepository.save(pPriya);

        paymentRepository.save(new Payment(savedB2, "TXN-RAIL-2026-002", "CREDIT_CARD", 530.0, "SUCCESS"));

        // 6. Demo Berth Exchange Request
        BerthExchangeRequest req = new BerthExchangeRequest();
        req.setRequesterBooking(savedB2);
        req.setRequesterPassenger(pPriya);
        req.setTargetBooking(savedB1);
        req.setTargetPassenger(pRahul);
        req.setTrain(pandian);
        req.setJourneyDate(LocalDate.now().plusDays(2));
        req.setStatus(ExchangeStatus.REQUESTED);
        req.setRequestReason("Prefers lower berth due to slight knee sprain. Both passengers in Coach B1.");
        req.setCreatedAt(LocalDateTime.now().minusHours(3));
        req.setUpdatedAt(LocalDateTime.now().minusHours(3));
        exchangeRepository.save(req);

        System.out.println(">>> RailConnect: Successfully bootstrapped 24 stations, 30 trains, coaches, seats & demo records!");
    }

    private static class StopDef {
        Station station;
        double distanceKm;
        LocalTime arr;
        LocalTime dep;

        StopDef(Station station, double distanceKm, LocalTime arr, LocalTime dep) {
            this.station = station;
            this.distanceKm = distanceKm;
            this.arr = arr;
            this.dep = dep;
        }
    }

    private Train registerTrainWithStops(String number, String name, String type,
                                         LocalTime dep, LocalTime arr, double duration,
                                         String days, List<StopDef> stops) {
        Train t = new Train();
        t.setTrainNumber(number);
        t.setTrainName(name);
        t.setTrainType(type);
        t.setSourceStation(stops.get(0).station);
        t.setDestinationStation(stops.get(stops.size() - 1).station);
        t.setDepartureTime(dep);
        t.setArrivalTime(arr);
        t.setDurationHours(duration);
        t.setRunningDays(days);
        t.setActive(true);
        t = trainRepository.save(t);

        List<TrainRoute> routes = new ArrayList<>();
        for (int i = 0; i < stops.size(); i++) {
            StopDef stop = stops.get(i);
            TrainRoute r = new TrainRoute();
            r.setTrain(t);
            r.setStation(stop.station);
            r.setStopSequence(i + 1);
            r.setDistanceFromSourceKm(stop.distanceKm);
            r.setArrivalTime(stop.arr);
            r.setDepartureTime(stop.dep);
            routes.add(r);
        }
        trainRouteRepository.saveAll(routes);

        // Coaches & Seats
        if ("VANDE_BHARAT".equalsIgnoreCase(type)) {
            Coach c1 = coachRepository.save(new Coach(t.getId(), "C1", "CC", 78));
            Coach c2 = coachRepository.save(new Coach(t.getId(), "C2", "CC", 78));
            Coach e1 = coachRepository.save(new Coach(t.getId(), "E1", "EC", 52));
            populateCCSeats(c1, 40);
            populateCCSeats(c2, 40);
            populateECSeats(e1, 24);
        } else if ("SHATABDI".equalsIgnoreCase(type)) {
            Coach c1 = coachRepository.save(new Coach(t.getId(), "C1", "CC", 78));
            Coach e1 = coachRepository.save(new Coach(t.getId(), "E1", "EC", 52));
            populateCCSeats(c1, 40);
            populateECSeats(e1, 24);
        } else if ("RAJDHANI".equalsIgnoreCase(type)) {
            Coach a1 = coachRepository.save(new Coach(t.getId(), "A1", "2A", 54));
            Coach b1 = coachRepository.save(new Coach(t.getId(), "B1", "3A", 64));
            Coach h1 = coachRepository.save(new Coach(t.getId(), "H1", "1A", 24));
            populateSleeperSeats(b1, 32);
            populate2ASeats(a1, 24);
            populate1ASeats(h1, 16);
        } else {
            Coach b1 = coachRepository.save(new Coach(t.getId(), "B1", "3A", 64));
            Coach s1 = coachRepository.save(new Coach(t.getId(), "S1", "SL", 72));
            populateSleeperSeats(b1, 32);
            populateSleeperSeats(s1, 36);
        }

        return t;
    }

    private void populateCCSeats(Coach coach, int count) {
        BerthType[] ccTypes = {BerthType.WINDOW, BerthType.MIDDLE, BerthType.AISLE, BerthType.AISLE, BerthType.WINDOW};
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            BerthType type = ccTypes[(i - 1) % 5];
            int cabin = ((i - 1) / 5) + 1;
            seats.add(new Seat(coach, i, type, cabin));
        }
        seatRepository.saveAll(seats);
    }

    private void populateECSeats(Coach coach, int count) {
        BerthType[] ecTypes = {BerthType.WINDOW, BerthType.AISLE, BerthType.AISLE, BerthType.WINDOW};
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            BerthType type = ecTypes[(i - 1) % 4];
            int cabin = ((i - 1) / 4) + 1;
            seats.add(new Seat(coach, i, type, cabin));
        }
        seatRepository.saveAll(seats);
    }

    private void populateSleeperSeats(Coach coach, int count) {
        BerthType[] sleeperTypes = {BerthType.LOWER, BerthType.MIDDLE, BerthType.UPPER, BerthType.LOWER, BerthType.MIDDLE, BerthType.UPPER, BerthType.SIDE_LOWER, BerthType.SIDE_UPPER};
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            BerthType type = sleeperTypes[(i - 1) % 8];
            int cabin = ((i - 1) / 8) + 1;
            seats.add(new Seat(coach, i, type, cabin));
        }
        seatRepository.saveAll(seats);
    }

    private void populate2ASeats(Coach coach, int count) {
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            BerthType type = (i % 2 == 1) ? BerthType.LOWER : BerthType.UPPER;
            seats.add(new Seat(coach, i, type, (i / 4) + 1));
        }
        seatRepository.saveAll(seats);
    }

    private void populate1ASeats(Coach coach, int count) {
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            BerthType type = (i % 2 == 1) ? BerthType.LOWER : BerthType.UPPER;
            seats.add(new Seat(coach, i, type, (i / 2) + 1));
        }
        seatRepository.saveAll(seats);
    }
}
