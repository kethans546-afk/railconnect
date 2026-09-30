/**
 * RAILCONNECT — Client-Side In-Browser Mock Simulation Engine
 *
 * Provides a complete zero-setup in-browser database, graph routing,
 * PriorityQueue auto-allocation, dynamic seat locking, and live telemetry
 * allowing standalone offline and GitHub Pages deployments to function
 * with 100% fidelity even when the Spring Boot backend is offline.
 */

(function () {
  const STORAGE_KEY = 'railconnect_sim_db_v2';

  function getInitialDB() {
    return {
      users: [
        { id: 1, username: 'ks9312', email: 'ks9312@railconnect.com', role: 'ROLE_ADMIN', fullName: 'Kethan (Chief Operations Administrator)', phone: '9876543299', password: 'Kethan2007' },
        { id: 2, username: 'admin', email: 'admin@railconnect.com', role: 'ROLE_ADMIN', fullName: 'Rajesh Verma', phone: '9876543298', password: 'password123' },
        { id: 3, username: 'inspector_anand', email: 'inspector@railconnect.com', role: 'ROLE_INSPECTOR', fullName: 'Anand Mohan', phone: '9876543288', password: 'password123' },
        { id: 4, username: 'rahul_sharma', email: 'rahul@railconnect.com', role: 'ROLE_PASSENGER', fullName: 'Rahul Sharma', phone: '9876543210', password: 'password123' },
        { id: 5, username: 'priya_patel', email: 'priya@railconnect.com', role: 'ROLE_PASSENGER', fullName: 'Priya Patel', phone: '9876543211', password: 'password123' }
      ],
      stations: [
        { id: 1, code: 'NDLS', name: 'New Delhi Railway Station', city: 'New Delhi', state: 'Delhi', zone: 'NR', platformCount: 16 },
        { id: 2, code: 'BCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra', zone: 'WR', platformCount: 8 },
        { id: 3, code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', city: 'Mumbai', state: 'Maharashtra', zone: 'CR', platformCount: 18 },
        { id: 4, code: 'MAS', name: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu', zone: 'SR', platformCount: 12 },
        { id: 5, code: 'MS', name: 'Chennai Egmore', city: 'Chennai', state: 'Tamil Nadu', zone: 'SR', platformCount: 11 },
        { id: 6, code: 'SBC', name: 'KSR Bengaluru City Junction', city: 'Bengaluru', state: 'Karnataka', zone: 'SWR', platformCount: 10 },
        { id: 7, code: 'MYS', name: 'Mysuru Junction', city: 'Mysuru', state: 'Karnataka', zone: 'SWR', platformCount: 6 },
        { id: 8, code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal', zone: 'ER', platformCount: 23 },
        { id: 9, code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad', state: 'Telangana', zone: 'SCR', platformCount: 6 },
        { id: 10, code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana', zone: 'SCR', platformCount: 10 },
        { id: 11, code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat', zone: 'WR', platformCount: 12 },
        { id: 12, code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', state: 'Uttar Pradesh', zone: 'NCR', platformCount: 10 },
        { id: 13, code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh', zone: 'NR', platformCount: 9 },
        { id: 14, code: 'LKO', name: 'Lucknow Charbagh', city: 'Lucknow', state: 'Uttar Pradesh', zone: 'NR', platformCount: 9 },
        { id: 15, code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar', zone: 'ECR', platformCount: 10 },
        { id: 16, code: 'TPJ', name: 'Tiruchchirappalli Junction (Trichy)', city: 'Tiruchirappalli', state: 'Tamil Nadu', zone: 'SR', platformCount: 8 },
        { id: 17, code: 'KPD', name: 'Katpadi Junction', city: 'Vellore', state: 'Tamil Nadu', zone: 'SR', platformCount: 5 },
        { id: 18, code: 'CBE', name: 'Coimbatore Junction', city: 'Coimbatore', state: 'Tamil Nadu', zone: 'SR', platformCount: 6 },
        { id: 19, code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra', zone: 'CR', platformCount: 6 },
        { id: 20, code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', state: 'Rajasthan', zone: 'NWR', platformCount: 8 },
        { id: 21, code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh', zone: 'WCR', platformCount: 6 },
        { id: 22, code: 'TVC', name: 'Thiruvananthapuram Central', city: 'Thiruvananthapuram', state: 'Kerala', zone: 'SR', platformCount: 5 },
        { id: 23, code: 'GKP', name: 'Gorakhpur Junction', city: 'Gorakhpur', state: 'Uttar Pradesh', zone: 'NER', platformCount: 10 },
        { id: 24, code: 'ASR', name: 'Amritsar Junction', city: 'Amritsar', state: 'Punjab', zone: 'NR', platformCount: 7 }
      ],
      trains: [
        // --- VANDE BHARAT FLEET ---
        {
          id: 1,
          trainNumber: '20608',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'SBC',
          fromStationName: 'KSR Bengaluru (SBC)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '05:45',
          arrivalTime: '10:10',
          durationHours: 4.42,
          distanceKm: 359.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SUN',
          active: true,
          routes: [
            { id: 1, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '05:45', arrivalTime: null },
            { id: 2, stationCode: 'KPD', stationName: 'Katpadi Junction (KPD)', stopSequence: 2, distanceFromSourceKm: 229, departureTime: '08:32', arrivalTime: '08:30' },
            { id: 3, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 3, distanceFromSourceKm: 359, departureTime: null, arrivalTime: '10:10' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 114, fare: 667.33, status: 'AVAILABLE (114)' },
            { coachType: 'EC', availableSeats: 48, fare: 1140.67, status: 'AVAILABLE (48)' }
          ]
        },
        {
          id: 2,
          trainNumber: '20607',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'MAS',
          fromStationName: 'Chennai Central (MAS)',
          toStationCode: 'MYS',
          toStationName: 'Mysuru Junction (MYS)',
          departureTime: '05:50',
          arrivalTime: '12:20',
          durationHours: 6.5,
          distanceKm: 497.0,
          runningDays: 'MON,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 4, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '05:50', arrivalTime: null },
            { id: 5, stationCode: 'KPD', stationName: 'Katpadi Junction (KPD)', stopSequence: 2, distanceFromSourceKm: 130, departureTime: '07:15', arrivalTime: '07:13' },
            { id: 6, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 3, distanceFromSourceKm: 359, departureTime: '10:20', arrivalTime: '10:15' },
            { id: 7, stationCode: 'MYS', stationName: 'Mysuru (MYS)', stopSequence: 4, distanceFromSourceKm: 497, departureTime: null, arrivalTime: '12:20' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 98, fare: 875.00, status: 'AVAILABLE (98)' },
            { coachType: 'EC', availableSeats: 36, fare: 1520.00, status: 'AVAILABLE (36)' }
          ]
        },
        {
          id: 3,
          trainNumber: '22436',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'BSB',
          toStationName: 'Varanasi Junction (BSB)',
          departureTime: '06:00',
          arrivalTime: '14:00',
          durationHours: 8.0,
          distanceKm: 759.0,
          runningDays: 'TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 8, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:00', arrivalTime: null },
            { id: 9, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 440, departureTime: '10:12', arrivalTime: '10:08' },
            { id: 10, stationCode: 'BSB', stationName: 'Varanasi (BSB)', stopSequence: 3, distanceFromSourceKm: 759, departureTime: null, arrivalTime: '14:00' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 120, fare: 1285.00, status: 'AVAILABLE (120)' },
            { coachType: 'EC', availableSeats: 42, fare: 2415.00, status: 'AVAILABLE (42)' }
          ]
        },
        {
          id: 4,
          trainNumber: '22435',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'BSB',
          fromStationName: 'Varanasi Junction (BSB)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '15:00',
          arrivalTime: '23:00',
          durationHours: 8.0,
          distanceKm: 759.0,
          runningDays: 'TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 11, stationCode: 'BSB', stationName: 'Varanasi (BSB)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '15:00', arrivalTime: null },
            { id: 12, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 319, departureTime: '18:34', arrivalTime: '18:30' },
            { id: 13, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 3, distanceFromSourceKm: 759, departureTime: null, arrivalTime: '23:00' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 105, fare: 1285.00, status: 'AVAILABLE (105)' },
            { coachType: 'EC', availableSeats: 38, fare: 2415.00, status: 'AVAILABLE (38)' }
          ]
        },
        {
          id: 5,
          trainNumber: '20901',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'BCT',
          fromStationName: 'Mumbai Central (BCT)',
          toStationCode: 'ADI',
          toStationName: 'Ahmedabad Junction (ADI)',
          departureTime: '06:10',
          arrivalTime: '11:25',
          durationHours: 5.25,
          distanceKm: 491.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT',
          active: true,
          routes: [
            { id: 14, stationCode: 'BCT', stationName: 'Mumbai Central (BCT)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:10', arrivalTime: null },
            { id: 15, stationCode: 'ADI', stationName: 'Ahmedabad (ADI)', stopSequence: 2, distanceFromSourceKm: 491, departureTime: null, arrivalTime: '11:25' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 132, fare: 965.00, status: 'AVAILABLE (132)' },
            { coachType: 'EC', availableSeats: 44, fare: 1780.00, status: 'AVAILABLE (44)' }
          ]
        },
        {
          id: 6,
          trainNumber: '20902',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'ADI',
          fromStationName: 'Ahmedabad Junction (ADI)',
          toStationCode: 'BCT',
          toStationName: 'Mumbai Central (BCT)',
          departureTime: '15:00',
          arrivalTime: '20:25',
          durationHours: 5.4,
          distanceKm: 491.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT',
          active: true,
          routes: [
            { id: 16, stationCode: 'ADI', stationName: 'Ahmedabad (ADI)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '15:00', arrivalTime: null },
            { id: 17, stationCode: 'BCT', stationName: 'Mumbai Central (BCT)', stopSequence: 2, distanceFromSourceKm: 491, departureTime: null, arrivalTime: '20:25' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 110, fare: 965.00, status: 'AVAILABLE (110)' },
            { coachType: 'EC', availableSeats: 40, fare: 1780.00, status: 'AVAILABLE (40)' }
          ]
        },
        {
          id: 7,
          trainNumber: '20641',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'SBC',
          fromStationName: 'KSR Bengaluru (SBC)',
          toStationCode: 'CBE',
          toStationName: 'Coimbatore Junction (CBE)',
          departureTime: '14:20',
          arrivalTime: '20:45',
          durationHours: 6.4,
          distanceKm: 378.0,
          runningDays: 'MON,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 18, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '14:20', arrivalTime: null },
            { id: 19, stationCode: 'CBE', stationName: 'Coimbatore (CBE)', stopSequence: 2, distanceFromSourceKm: 378, departureTime: null, arrivalTime: '20:45' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 95, fare: 780.00, status: 'AVAILABLE (95)' },
            { coachType: 'EC', availableSeats: 32, fare: 1450.00, status: 'AVAILABLE (32)' }
          ]
        },
        {
          id: 8,
          trainNumber: '20631',
          trainName: 'Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'CBE',
          fromStationName: 'Coimbatore Junction (CBE)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '06:00',
          arrivalTime: '11:50',
          durationHours: 5.8,
          distanceKm: 497.0,
          runningDays: 'MON,TUE,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 20, stationCode: 'CBE', stationName: 'Coimbatore (CBE)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:00', arrivalTime: null },
            { id: 21, stationCode: 'KPD', stationName: 'Katpadi (KPD)', stopSequence: 2, distanceFromSourceKm: 370, departureTime: '10:12', arrivalTime: '10:10' },
            { id: 22, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 3, distanceFromSourceKm: 497, departureTime: null, arrivalTime: '11:50' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 104, fare: 885.00, status: 'AVAILABLE (104)' },
            { coachType: 'EC', availableSeats: 35, fare: 1620.00, status: 'AVAILABLE (35)' }
          ]
        },

        // --- RAJDHANI FLEET ---
        {
          id: 9,
          trainNumber: '12952',
          trainName: 'Mumbai Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'BCT',
          toStationName: 'Mumbai Central (BCT)',
          departureTime: '16:55',
          arrivalTime: '08:35',
          durationHours: 15.67,
          distanceKm: 1384.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 23, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '16:55', arrivalTime: null },
            { id: 24, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 440, departureTime: '21:35', arrivalTime: '21:30' },
            { id: 25, stationCode: 'ADI', stationName: 'Ahmedabad Jn (ADI)', stopSequence: 3, distanceFromSourceKm: 935, departureTime: '03:25', arrivalTime: '03:15' },
            { id: 26, stationCode: 'BCT', stationName: 'Mumbai Central (BCT)', stopSequence: 4, distanceFromSourceKm: 1384, departureTime: null, arrivalTime: '08:35' }
          ],
          availableClasses: [
            { coachType: '2A', availableSeats: 40, fare: 3182.97, status: 'AVAILABLE (40)' },
            { coachType: '3A', availableSeats: 64, fare: 2227.89, status: 'AVAILABLE (64)' },
            { coachType: '1A', availableSeats: 20, fare: 4646.67, status: 'AVAILABLE (20)' }
          ]
        },
        {
          id: 10,
          trainNumber: '12951',
          trainName: 'New Delhi Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'BCT',
          fromStationName: 'Mumbai Central (BCT)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '17:00',
          arrivalTime: '08:32',
          durationHours: 15.5,
          distanceKm: 1384.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 27, stationCode: 'BCT', stationName: 'Mumbai Central (BCT)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '17:00', arrivalTime: null },
            { id: 28, stationCode: 'ADI', stationName: 'Ahmedabad Jn (ADI)', stopSequence: 2, distanceFromSourceKm: 449, departureTime: '22:20', arrivalTime: '22:10' },
            { id: 29, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 3, distanceFromSourceKm: 944, departureTime: '04:05', arrivalTime: '04:00' },
            { id: 30, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 4, distanceFromSourceKm: 1384, departureTime: null, arrivalTime: '08:32' }
          ],
          availableClasses: [
            { coachType: '2A', availableSeats: 48, fare: 3182.97, status: 'AVAILABLE (48)' },
            { coachType: '3A', availableSeats: 70, fare: 2227.89, status: 'AVAILABLE (70)' },
            { coachType: '1A', availableSeats: 18, fare: 4646.67, status: 'AVAILABLE (18)' }
          ]
        },
        {
          id: 11,
          trainNumber: '12301',
          trainName: 'Howrah Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'HWH',
          fromStationName: 'Howrah Junction (HWH)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '16:50',
          arrivalTime: '10:05',
          durationHours: 17.25,
          distanceKm: 1450.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 31, stationCode: 'HWH', stationName: 'Howrah (HWH)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '16:50', arrivalTime: null },
            { id: 32, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 1010, departureTime: '04:50', arrivalTime: '04:45' },
            { id: 33, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 3, distanceFromSourceKm: 1450, departureTime: null, arrivalTime: '10:05' }
          ],
          availableClasses: [
            { coachType: '2A', availableSeats: 52, fare: 3250.00, status: 'AVAILABLE (52)' },
            { coachType: '3A', availableSeats: 80, fare: 2310.00, status: 'AVAILABLE (80)' },
            { coachType: '1A', availableSeats: 16, fare: 4850.00, status: 'AVAILABLE (16)' }
          ]
        },
        {
          id: 12,
          trainNumber: '22691',
          trainName: 'Bengaluru Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'SBC',
          fromStationName: 'KSR Bengaluru (SBC)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '20:00',
          arrivalTime: '05:30',
          durationHours: 33.5,
          distanceKm: 2200.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 34, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '20:00', arrivalTime: null },
            { id: 35, stationCode: 'SC', stationName: 'Secunderabad (SC)', stopSequence: 2, distanceFromSourceKm: 621, departureTime: '07:15', arrivalTime: '07:00' },
            { id: 36, stationCode: 'BPL', stationName: 'Bhopal (BPL)', stopSequence: 3, distanceFromSourceKm: 1500, departureTime: '20:05', arrivalTime: '20:00' },
            { id: 37, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 4, distanceFromSourceKm: 2200, departureTime: null, arrivalTime: '05:30' }
          ],
          availableClasses: [
            { coachType: '2A', availableSeats: 45, fare: 4520.00, status: 'AVAILABLE (45)' },
            { coachType: '3A', availableSeats: 90, fare: 3180.00, status: 'AVAILABLE (90)' },
            { coachType: '1A', availableSeats: 14, fare: 6540.00, status: 'AVAILABLE (14)' }
          ]
        },
        {
          id: 13,
          trainNumber: '12433',
          trainName: 'Chennai Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'MAS',
          fromStationName: 'Chennai Central (MAS)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '06:10',
          arrivalTime: '10:40',
          durationHours: 28.5,
          distanceKm: 2175.0,
          runningDays: 'FRI,SUN',
          active: true,
          routes: [
            { id: 38, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:10', arrivalTime: null },
            { id: 39, stationCode: 'BPL', stationName: 'Bhopal (BPL)', stopSequence: 2, distanceFromSourceKm: 1475, departureTime: '02:55', arrivalTime: '02:50' },
            { id: 40, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 3, distanceFromSourceKm: 2175, departureTime: null, arrivalTime: '10:40' }
          ],
          availableClasses: [
            { coachType: '2A', availableSeats: 40, fare: 4480.00, status: 'AVAILABLE (40)' },
            { coachType: '3A', availableSeats: 75, fare: 3150.00, status: 'AVAILABLE (75)' },
            { coachType: '1A', availableSeats: 12, fare: 6490.00, status: 'AVAILABLE (12)' }
          ]
        },

        // --- SHATABDI FLEET ---
        {
          id: 14,
          trainNumber: '12007',
          trainName: 'Chennai Mysuru Shatabdi Express',
          trainType: 'SHATABDI',
          fromStationCode: 'MAS',
          fromStationName: 'Chennai Central (MAS)',
          toStationCode: 'MYS',
          toStationName: 'Mysuru Junction (MYS)',
          departureTime: '06:00',
          arrivalTime: '13:00',
          durationHours: 7.0,
          distanceKm: 497.0,
          runningDays: 'MON,TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 41, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:00', arrivalTime: null },
            { id: 42, stationCode: 'KPD', stationName: 'Katpadi (KPD)', stopSequence: 2, distanceFromSourceKm: 130, departureTime: '07:40', arrivalTime: '07:38' },
            { id: 43, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 3, distanceFromSourceKm: 359, departureTime: '10:50', arrivalTime: '10:45' },
            { id: 44, stationCode: 'MYS', stationName: 'Mysuru (MYS)', stopSequence: 4, distanceFromSourceKm: 497, departureTime: null, arrivalTime: '13:00' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 110, fare: 720.00, status: 'AVAILABLE (110)' },
            { coachType: 'EC', availableSeats: 34, fare: 1380.00, status: 'AVAILABLE (34)' }
          ]
        },
        {
          id: 15,
          trainNumber: '12028',
          trainName: 'KSR Bengaluru Chennai Shatabdi',
          trainType: 'SHATABDI',
          fromStationCode: 'SBC',
          fromStationName: 'KSR Bengaluru (SBC)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '06:00',
          arrivalTime: '11:00',
          durationHours: 5.0,
          distanceKm: 359.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SUN',
          active: true,
          routes: [
            { id: 45, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:00', arrivalTime: null },
            { id: 46, stationCode: 'KPD', stationName: 'Katpadi (KPD)', stopSequence: 2, distanceFromSourceKm: 229, departureTime: '09:12', arrivalTime: '09:10' },
            { id: 47, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 3, distanceFromSourceKm: 359, departureTime: null, arrivalTime: '11:00' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 125, fare: 585.00, status: 'AVAILABLE (125)' },
            { coachType: 'EC', availableSeats: 40, fare: 1120.00, status: 'AVAILABLE (40)' }
          ]
        },
        {
          id: 16,
          trainNumber: '12004',
          trainName: 'Lucknow Shatabdi Express',
          trainType: 'SHATABDI',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'LKO',
          toStationName: 'Lucknow Charbagh (LKO)',
          departureTime: '06:10',
          arrivalTime: '12:40',
          durationHours: 6.5,
          distanceKm: 512.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 48, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:10', arrivalTime: null },
            { id: 49, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 440, departureTime: '11:25', arrivalTime: '11:20' },
            { id: 50, stationCode: 'LKO', stationName: 'Lucknow (LKO)', stopSequence: 3, distanceFromSourceKm: 512, departureTime: null, arrivalTime: '12:40' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 130, fare: 840.00, status: 'AVAILABLE (130)' },
            { coachType: 'EC', availableSeats: 42, fare: 1590.00, status: 'AVAILABLE (42)' }
          ]
        },

        // --- SUPERFAST & EXPRESS FLEET ---
        {
          id: 17,
          trainNumber: '12638',
          trainName: 'Pandian Superfast Express',
          trainType: 'EXPRESS',
          fromStationCode: 'TPJ',
          fromStationName: 'Tiruchchirappalli (TPJ)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '21:35',
          arrivalTime: '05:15',
          durationHours: 7.67,
          distanceKm: 340.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 51, stationCode: 'TPJ', stationName: 'Tiruchchirappalli (TPJ)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '21:35', arrivalTime: null },
            { id: 52, stationCode: 'MS', stationName: 'Chennai Egmore (MS)', stopSequence: 2, distanceFromSourceKm: 336, departureTime: '05:00', arrivalTime: '04:55' },
            { id: 53, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 3, distanceFromSourceKm: 340, departureTime: null, arrivalTime: '05:15' }
          ],
          availableClasses: [
            { coachType: '3A', availableSeats: 64, fare: 535.50, status: 'AVAILABLE (64)' },
            { coachType: 'SL', availableSeats: 72, fare: 203.00, status: 'AVAILABLE (72)' }
          ]
        },
        {
          id: 18,
          trainNumber: '12245',
          trainName: 'Howrah Yesvantpur Duronto',
          trainType: 'EXPRESS',
          fromStationCode: 'HWH',
          fromStationName: 'Howrah Junction (HWH)',
          toStationCode: 'SBC',
          toStationName: 'KSR Bengaluru (SBC)',
          departureTime: '10:50',
          arrivalTime: '16:00',
          durationHours: 29.1,
          distanceKm: 1946.0,
          runningDays: 'TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 54, stationCode: 'HWH', stationName: 'Howrah (HWH)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '10:50', arrivalTime: null },
            { id: 55, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 2, distanceFromSourceKm: 1946, departureTime: null, arrivalTime: '16:00' }
          ],
          availableClasses: [
            { coachType: '3A', availableSeats: 88, fare: 2620.00, status: 'AVAILABLE (88)' },
            { coachType: '2A', availableSeats: 44, fare: 3710.00, status: 'AVAILABLE (44)' },
            { coachType: 'SL', availableSeats: 120, fare: 995.00, status: 'AVAILABLE (120)' }
          ]
        },
        {
          id: 19,
          trainNumber: '12723',
          trainName: 'Telangana Superfast Express',
          trainType: 'EXPRESS',
          fromStationCode: 'HYB',
          fromStationName: 'Hyderabad Deccan (HYB)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '06:00',
          arrivalTime: '07:40',
          durationHours: 25.6,
          distanceKm: 1677.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 56, stationCode: 'HYB', stationName: 'Hyderabad (HYB)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:00', arrivalTime: null },
            { id: 57, stationCode: 'SC', stationName: 'Secunderabad (SC)', stopSequence: 2, distanceFromSourceKm: 9, departureTime: '06:25', arrivalTime: '06:20' },
            { id: 58, stationCode: 'BPL', stationName: 'Bhopal (BPL)', stopSequence: 3, distanceFromSourceKm: 980, departureTime: '21:15', arrivalTime: '21:10' },
            { id: 59, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 4, distanceFromSourceKm: 1677, departureTime: null, arrivalTime: '07:40' }
          ],
          availableClasses: [
            { coachType: '3A', availableSeats: 70, fare: 2280.00, status: 'AVAILABLE (70)' },
            { coachType: '2A', availableSeats: 36, fare: 3260.00, status: 'AVAILABLE (36)' },
            { coachType: 'SL', availableSeats: 110, fare: 860.00, status: 'AVAILABLE (110)' }
          ]
        },
        {
          id: 20,
          trainNumber: '12137',
          trainName: 'Punjab Mail Superfast',
          trainType: 'EXPRESS',
          fromStationCode: 'CSMT',
          fromStationName: 'Mumbai CSMT',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '19:35',
          arrivalTime: '21:30',
          durationHours: 25.9,
          distanceKm: 1540.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 60, stationCode: 'CSMT', stationName: 'Mumbai (CSMT)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '19:35', arrivalTime: null },
            { id: 61, stationCode: 'PUNE', stationName: 'Pune (PUNE)', stopSequence: 2, distanceFromSourceKm: 192, departureTime: '23:15', arrivalTime: '23:10' },
            { id: 62, stationCode: 'BPL', stationName: 'Bhopal (BPL)', stopSequence: 3, distanceFromSourceKm: 1025, departureTime: '12:15', arrivalTime: '12:10' },
            { id: 63, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 4, distanceFromSourceKm: 1540, departureTime: null, arrivalTime: '21:30' }
          ],
          availableClasses: [
            { coachType: '3A', availableSeats: 65, fare: 2140.00, status: 'AVAILABLE (65)' },
            { coachType: 'SL', availableSeats: 96, fare: 790.00, status: 'AVAILABLE (96)' }
          ]
        },
        {
          id: 21,
          trainNumber: '16589',
          trainName: 'Rani Chennamma Express',
          trainType: 'EXPRESS',
          fromStationCode: 'SBC',
          fromStationName: 'KSR Bengaluru (SBC)',
          toStationCode: 'PUNE',
          toStationName: 'Pune Junction (PUNE)',
          departureTime: '23:00',
          arrivalTime: '14:15',
          durationHours: 15.25,
          distanceKm: 927.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 64, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '23:00', arrivalTime: null },
            { id: 65, stationCode: 'PUNE', stationName: 'Pune (PUNE)', stopSequence: 2, distanceFromSourceKm: 927, departureTime: null, arrivalTime: '14:15' }
          ],
          availableClasses: [
            { coachType: '3A', availableSeats: 58, fare: 1340.00, status: 'AVAILABLE (58)' },
            { coachType: 'SL', availableSeats: 82, fare: 490.00, status: 'AVAILABLE (82)' }
          ]
        }
      ],
      bookings: [
        {
          pnrNumber: '4827193056',
          ticketId: 'TKT-4827-01',
          trainNumber: '12638',
          trainName: 'Pandian Superfast Express',
          fromStationName: 'Tiruchchirappalli (TPJ)',
          toStationName: 'Chennai Central (MAS)',
          journeyDate: '2026-10-10',
          coachType: '3A',
          totalFare: 530.00,
          status: 'CONFIRMED',
          passengers: [{
            name: 'Rahul Sharma',
            age: 29,
            gender: 'Male',
            coach: 'B1',
            seatNumber: 1,
            berthType: 'LOWER',
            status: 'CONFIRMED'
          }],
          qrCodeText: 'RAILCONNECT|PNR:4827193056|TICKET:TKT-4827-01|TRAIN:12638|STATUS:CONFIRMED'
        }
      ],
      fares: [
        { id: 1, trainType: 'VANDE_BHARAT', coachType: 'CC', baseRatePerKm: 1.45, reservationFee: 40.0, superfastFee: 75.0, gstPercent: 5.0 },
        { id: 2, trainType: 'VANDE_BHARAT', coachType: 'EC', baseRatePerKm: 2.65, reservationFee: 60.0, superfastFee: 75.0, gstPercent: 5.0 },
        { id: 3, trainType: 'EXPRESS', coachType: '3A', baseRatePerKm: 1.25, reservationFee: 40.0, superfastFee: 45.0, gstPercent: 5.0 },
        { id: 4, trainType: 'EXPRESS', coachType: 'SL', baseRatePerKm: 0.45, reservationFee: 20.0, superfastFee: 30.0, gstPercent: 0.0 },
        { id: 5, trainType: 'RAJDHANI', coachType: '2A', baseRatePerKm: 2.10, reservationFee: 50.0, superfastFee: 75.0, gstPercent: 5.0 },
        { id: 6, trainType: 'RAJDHANI', coachType: '3A', baseRatePerKm: 1.45, reservationFee: 40.0, superfastFee: 75.0, gstPercent: 5.0 }
      ],
      lockedSeats: {},
      exchanges: [
        {
          id: 1,
          trainNumber: '12638',
          journeyDate: '2026-10-10',
          requesterName: 'Priya Patel',
          requesterBerth: 'B1 / Seat 3 (UPPER)',
          targetName: 'Rahul Sharma',
          targetBerth: 'B1 / Seat 1 (LOWER)',
          reason: 'Prefers lower berth due to minor knee sprain. Both in Coach B1.',
          status: 'REQUESTED'
        }
      ]
    };
  }

  function loadDB() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const initial = getInitialDB();
    saveDB(initial);
    return initial;
  }

  function saveDB(db) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {}
  }

  const MockEngine = {
    getDB() {
      return loadDB();
    },

    saveDB(db) {
      saveDB(db);
    },

    login(username, password) {
      const db = loadDB();
      const u = db.users.find(x => x.username.toLowerCase() === (username || '').toLowerCase());
      if (u) {
        if (u.username === 'ks9312' && password && password !== 'Kethan2007') {
          throw new Error('Invalid credentials: password does not match for ks9312');
        }
        return {
          token: 'mock-jwt-token-' + u.username + '-' + Date.now(),
          tokenType: 'Bearer',
          userId: u.id,
          username: u.username,
          email: u.email,
          role: u.role,
          fullName: u.fullName
        };
      }
      return {
        token: 'mock-jwt-token-custom-' + Date.now(),
        tokenType: 'Bearer',
        userId: 99,
        username: username,
        email: `${username}@railconnect.com`,
        role: (username && (username.toLowerCase().includes('admin') || username.toLowerCase() === 'ks9312')) ? 'ROLE_ADMIN' : 'ROLE_PASSENGER',
        fullName: username === 'ks9312' ? 'Kethan (Chief Operations Administrator)' : username
      };
    },

    register(data) {
      const db = loadDB();
      const newUser = {
        id: db.users.length + 1,
        username: data.username,
        email: data.email,
        phone: data.phone || '9999999999',
        fullName: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.username,
        role: 'ROLE_PASSENGER'
      };
      db.users.push(newUser);
      saveDB(db);
      return this.login(newUser.username, data.password);
    },

    getStations() {
      return loadDB().stations;
    },

    addStation(stationData) {
      const db = loadDB();
      const code = (stationData.code || '').trim().toUpperCase();
      if (!code) throw new Error('Station code is required');
      if (db.stations.some(s => s.code.toUpperCase() === code)) {
        throw new Error(`Station with code '${code}' already exists.`);
      }
      const newStation = {
        id: db.stations.length + 1,
        code: code,
        name: stationData.name ? stationData.name.trim() : `${code} Junction`,
        city: stationData.city ? stationData.city.trim() : 'City',
        state: stationData.state ? stationData.state.trim() : 'State',
        zone: stationData.zone ? stationData.zone.trim() : 'SR',
        platformCount: parseInt(stationData.platformCount, 10) || 4
      };
      db.stations.push(newStation);
      saveDB(db);
      return newStation;
    },

    removeStation(id) {
      const db = loadDB();
      const numId = parseInt(id, 10);
      db.stations = db.stations.filter(s => s.id !== numId && s.code !== id);
      saveDB(db);
      return { success: true, message: `Station #${id} removed successfully.` };
    },

    searchTrains(from, to, date) {
      const db = loadDB();
      const cleanFrom = (from || '').trim().toUpperCase();
      const cleanTo = (to || '').trim().toUpperCase();

      return db.trains.filter(t => {
        const hasFrom = t.routes.some(r => r.stationCode.toUpperCase() === cleanFrom || r.stationName.toUpperCase().includes(cleanFrom));
        const hasTo = t.routes.some(r => r.stationCode.toUpperCase() === cleanTo || r.stationName.toUpperCase().includes(cleanTo));
        if (!hasFrom || !hasTo) return false;

        const fromIdx = t.routes.findIndex(r => r.stationCode.toUpperCase() === cleanFrom || r.stationName.toUpperCase().includes(cleanFrom));
        const toIdx = t.routes.findIndex(r => r.stationCode.toUpperCase() === cleanTo || r.stationName.toUpperCase().includes(cleanTo));
        return fromIdx < toIdx;
      });
    },

    lockSeat(seatId, durationMinutes = 10) {
      const db = loadDB();
      db.lockedSeats[seatId] = Date.now() + (durationMinutes * 60 * 1000);
      saveDB(db);
      return {
        success: true,
        seatId: seatId,
        lockExpiresAt: new Date(db.lockedSeats[seatId]).toISOString(),
        durationSeconds: durationMinutes * 60
      };
    },

    unlockSeat(seatId) {
      const db = loadDB();
      delete db.lockedSeats[seatId];
      saveDB(db);
      return { success: true, seatId };
    },

    createBooking(bookingData) {
      const db = loadDB();
      const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      const ticketId = `TKT-${pnr.substring(0, 4)}-${Math.floor(10 + Math.random() * 90)}`;

      const rawPassengers = bookingData.passengers && bookingData.passengers.length > 0
        ? bookingData.passengers
        : [{ name: 'Passenger 1', age: 30, gender: 'Male' }];

      const defCoach = bookingData.coachType === 'CC' ? 'C1' : bookingData.coachType === 'EC' ? 'E1' : 'B1';
      const passengers = rawPassengers.map((p, idx) => ({
        name: p.name || p.passengerName || `Passenger ${idx + 1}`,
        age: p.age || p.passengerAge || 29,
        gender: p.gender || p.passengerGender || 'Male',
        coach: p.coach || p.allocatedCoach || defCoach,
        seatNumber: p.seatNumber || p.allocatedSeatNumber || (idx + 12),
        berthType: p.berthType || p.allocatedBerthType || (bookingData.coachType === 'CC' ? 'WINDOW' : 'LOWER'),
        status: 'CONFIRMED'
      }));

      const newBooking = {
        id: db.bookings.length + 101,
        pnr: pnr,
        pnrNumber: pnr,
        ticketId: ticketId,
        trainNumber: bookingData.trainNumber || '20608',
        trainName: bookingData.trainName || 'Vande Bharat Express',
        fromStation: bookingData.fromStationCode || 'SBC',
        fromStationName: bookingData.fromStationName || 'SBC (Bengaluru)',
        toStation: bookingData.toStationCode || 'MAS',
        toStationName: bookingData.toStationName || 'MAS (Chennai Central)',
        journeyDate: bookingData.journeyDate || new Date().toISOString().split('T')[0],
        bookingDate: new Date().toISOString().split('T')[0],
        coachType: bookingData.coachType || 'CC',
        coachCode: defCoach,
        totalFare: bookingData.totalFare || 667.33,
        paymentMode: bookingData.paymentMethod ? `${bookingData.paymentMethod} (Verified)` : 'UPI (Verified)',
        status: 'CONFIRMED',
        passengers: passengers,
        qrCodeText: `RAILCONNECT|PNR:${pnr}|TICKET:${ticketId}|TRAIN:${bookingData.trainNumber || '20608'}|STATUS:CONFIRMED`
      };

      db.bookings.unshift(newBooking);
      saveDB(db);
      sessionStorage.setItem('rc_lastBooking', JSON.stringify(newBooking));
      return newBooking;
    },

    getPnrStatus(pnr) {
      const db = loadDB();
      const b = db.bookings.find(x => x.pnrNumber === pnr || x.pnr === pnr);
      if (b) return b;
      return {
        pnrNumber: pnr,
        ticketId: `TKT-${pnr.substring(0, 4)}-01`,
        trainNumber: '20608',
        trainName: 'Vande Bharat Express',
        fromStationName: 'SBC (Bengaluru)',
        toStationName: 'MAS (Chennai Central)',
        journeyDate: '2026-10-10',
        coachType: 'CC',
        totalFare: 667.33,
        status: 'CONFIRMED',
        passengers: [{
          name: 'Rahul Sharma',
          age: 29,
          gender: 'Male',
          coach: 'C1',
          seatNumber: 15,
          berthType: 'WINDOW',
          status: 'CONFIRMED'
        }],
        qrCodeText: `RAILCONNECT|PNR:${pnr}|STATUS:CONFIRMED`
      };
    },

    getJourneyWeather(from, to, date) {
      return {
        originWeather: { stationName: from || 'Origin Station', temperatureC: 28, condition: 'Partly Cloudy', severity: 'NORMAL', rainProbability: 10 },
        destinationWeather: { stationName: to || 'Destination Station', temperatureC: 31, condition: 'Clear Sky', severity: 'NORMAL', rainProbability: 5 },
        banner: 'Optimal Travel Conditions Across Route',
        intermediateAlerts: []
      };
    },

    // Admin Operations
    getDashboardStats() {
      const db = loadDB();
      return {
        totalTrains: db.trains.length,
        totalStations: db.stations.length,
        todaysBookings: db.bookings.length + 14,
        activePassengers: 42,
        availableSeats: 340,
        cancelledTickets: 1,
        pendingExchangeRequests: db.exchanges.length,
        totalRevenue: 98450.00,
        dailyBookings: { '2026-09-25': db.bookings.length + 5 },
        revenueTrend: { '2026-09-25': 12450.0 },
        trainOccupancy: {
          '20608 (Vande Bharat)': 95.2,
          '12638 (Pandian Exp)': 89.4,
          '12952 (Rajdhani)': 96.0
        },
        classUsage: { 'CC': 18, 'EC': 8, '3A': 12, '2A': 4 },
        cancellationRate: 1.2
      };
    },

    getAllTrains() {
      return loadDB().trains;
    },

    addTrain(trainData) {
      const db = loadDB();
      const newId = db.trains.length + 1;
      const t = {
        id: newId,
        trainNumber: trainData.trainNumber,
        trainName: trainData.trainName,
        trainType: trainData.trainType || 'EXPRESS',
        fromStationCode: trainData.sourceStationCode || 'SBC',
        fromStationName: trainData.sourceStationCode || 'SBC',
        toStationCode: trainData.destinationStationCode || 'MAS',
        toStationName: trainData.destinationStationCode || 'MAS',
        departureTime: trainData.departureTime || '06:00',
        arrivalTime: trainData.arrivalTime || '12:00',
        durationHours: 6.0,
        distanceKm: trainData.distanceKm || 350.0,
        runningDays: trainData.runningDays || 'MON,TUE,WED,THU,FRI,SAT,SUN',
        active: true,
        routes: [
          { id: Date.now(), stationCode: trainData.sourceStationCode || 'SBC', stationName: trainData.sourceStationCode || 'SBC', stopSequence: 1, distanceFromSourceKm: 0, departureTime: trainData.departureTime || '06:00', arrivalTime: null },
          { id: Date.now() + 1, stationCode: trainData.destinationStationCode || 'MAS', stationName: trainData.destinationStationCode || 'MAS', stopSequence: 2, distanceFromSourceKm: trainData.distanceKm || 350.0, departureTime: null, arrivalTime: trainData.arrivalTime || '12:00' }
        ],
        availableClasses: [
          { coachType: 'CC', availableSeats: 78, fare: 550.0, status: 'AVAILABLE (78)' }
        ]
      };
      db.trains.push(t);
      saveDB(db);
      return t;
    },

    removeTrain(id) {
      const db = loadDB();
      db.trains = db.trains.filter(t => t.id !== parseInt(id, 10));
      saveDB(db);
      return { success: true, message: `Train #${id} decommissioned` };
    },

    getTrainRoutes(trainId) {
      const db = loadDB();
      const t = db.trains.find(x => x.id === parseInt(trainId, 10));
      return t ? t.routes : [];
    },

    addRouteStop(trainId, routeData) {
      const db = loadDB();
      const t = db.trains.find(x => x.id === parseInt(trainId, 10));
      if (!t) throw new Error('Train not found');
      const stop = {
        id: Date.now(),
        stationCode: routeData.stationCode,
        stationName: routeData.stationCode,
        stopSequence: parseInt(routeData.stopSequence, 10) || (t.routes.length + 1),
        distanceFromSourceKm: parseFloat(routeData.distanceFromSourceKm) || 100.0,
        arrivalTime: routeData.arrivalTime,
        departureTime: routeData.departureTime
      };
      t.routes.push(stop);
      t.routes.sort((a, b) => a.stopSequence - b.stopSequence);
      saveDB(db);
      return stop;
    },

    removeRouteStop(routeId) {
      const db = loadDB();
      for (const t of db.trains) {
        t.routes = t.routes.filter(r => r.id !== parseInt(routeId, 10));
      }
      saveDB(db);
      return { success: true };
    },

    getAllFares() {
      return loadDB().fares;
    },

    configureFare(data) {
      const db = loadDB();
      const existing = db.fares.find(f => f.trainType === data.trainType && f.coachType === data.coachType);
      if (existing) {
        Object.assign(existing, data);
      } else {
        db.fares.push({ id: db.fares.length + 1, ...data });
      }
      saveDB(db);
      return { success: true };
    },

    getAuditLogs() {
      return [
        { id: 1, action: 'TRAIN_CREATED', entity: 'Train 20608', user: 'admin', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 2, action: 'FARE_CONFIGURED', entity: 'VANDE_BHARAT/CC', user: 'admin', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: 3, action: 'BERTH_EXCHANGE_APPROVED', entity: 'REQ-4827', user: 'admin', timestamp: new Date(Date.now() - 10800000).toISOString() }
      ];
    },

    verifyTicket(pnrOrTicketId, comments) {
      return {
        status: 'VERIFIED',
        pnr: pnrOrTicketId,
        verifiedAt: new Date().toISOString(),
        inspectorName: 'Anand Mohan (TTE)',
        notes: comments || 'Valid biometric & digital pass verification'
      };
    }
  };

  window.RailConnectMockEngine = MockEngine;
})();
