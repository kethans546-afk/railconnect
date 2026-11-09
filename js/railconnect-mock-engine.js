/**
 * RAILCONNECT — Client-Side In-Browser Mock Simulation Engine
 *
 * Provides a complete zero-setup in-browser database, graph routing,
 * PriorityQueue auto-allocation, dynamic seat locking, and live telemetry
 * allowing standalone offline and GitHub Pages deployments to function
 * with 100% fidelity even when the Spring Boot backend is offline.
 */

(function () {
  const STORAGE_KEY = 'railconnect_sim_db_v4';

    const STATION_CLUSTERS = {
    'CHENNAI': ['MAS', 'MS'], 'MADRAS': ['MAS', 'MS'], 'MAS': ['MAS', 'MS'], 'MS': ['MAS', 'MS'],
    'MUMBAI': ['BCT', 'CSMT'], 'BOMBAY': ['BCT', 'CSMT'], 'BCT': ['BCT', 'CSMT'], 'CSMT': ['BCT', 'CSMT'],
    'HYDERABAD': ['HYB', 'SC'], 'SECUNDERABAD': ['HYB', 'SC'], 'HYB': ['HYB', 'SC'], 'SC': ['HYB', 'SC'],
    'DELHI': ['NDLS'], 'NEW DELHI': ['NDLS'], 'NDLS': ['NDLS'],
    'BENGALURU': ['SBC'], 'BANGALORE': ['SBC'], 'KSR': ['SBC'], 'SBC': ['SBC'],
    'TRICHY': ['TPJ'], 'TIRUCHIRAPPALLI': ['TPJ'], 'TIRUCHCHIRAPPALLI': ['TPJ'], 'TPJ': ['TPJ'],
    'KOLKATA': ['HWH'], 'CALCUTTA': ['HWH'], 'HOWRAH': ['HWH'], 'HWH': ['HWH'],
    'AHMEDABAD': ['ADI'], 'ADI': ['ADI'],
    'VARANASI': ['BSB'], 'BANARAS': ['BSB'], 'BSB': ['BSB'],
    'KANPUR': ['CNB'], 'CNB': ['CNB'],
    'LUCKNOW': ['LKO'], 'LKO': ['LKO'],
    'PATNA': ['PNBE'], 'PNBE': ['PNBE'],
    'COIMBATORE': ['CBE'], 'CBE': ['CBE'],
    'KATPADI': ['KPD'], 'VELLORE': ['KPD'], 'KPD': ['KPD'],
    'MYSORE': ['MYS'], 'MYSURU': ['MYS'], 'MYS': ['MYS'],
    'PUNE': ['PUNE'],
    'JAIPUR': ['JP'], 'JP': ['JP'],
    'BHOPAL': ['BPL'], 'BPL': ['BPL'],
    'TRIVANDRUM': ['TVC'], 'THIRUVANANTHAPURAM': ['TVC'], 'TVC': ['TVC'],
    'KOZHIKODE': ['CLT'], 'CALICUT': ['CLT'], 'CLT': ['CLT'],
    'ERNAKULAM': ['ERN'], 'KOCHI': ['ERN'], 'ERN': ['ERN'],
    'AMRITSAR': ['ASR'], 'ASR': ['ASR'],
    'GORAKHPUR': ['GKP'], 'GKP': ['GKP']
  };

  function getClusterCodes(input) {
    if (!input) return [];
    const str = input.trim().toUpperCase();
    const parenMatch = str.match(/\(([A-Za-z]{2,5})\)/);
    if (parenMatch && STATION_CLUSTERS[parenMatch[1]]) return STATION_CLUSTERS[parenMatch[1]];
    if (parenMatch) return [parenMatch[1]];

    const prefixMatch = str.match(/^([A-Za-z]{2,5})\b/);
    if (prefixMatch && STATION_CLUSTERS[prefixMatch[1]]) return STATION_CLUSTERS[prefixMatch[1]];

    for (const [key, codes] of Object.entries(STATION_CLUSTERS)) {
      if (str.includes(key)) return codes;
    }
    return [str];
  }

  function normalizeStation(input) {
    const codes = getClusterCodes(input);
    return codes.length > 0 ? codes[0] : (input || '').trim().toUpperCase();
  }

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
,
        // --- EXPANDED FLEET: BI-DIRECTIONAL & MAJOR CORRIDORS ---
        {
          id: 22,
          trainNumber: '12637',
          trainName: 'Pandian Superfast Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'MAS',
          fromStationName: 'Chennai Central (MAS)',
          toStationCode: 'TPJ',
          toStationName: 'Tiruchchirappalli (TPJ)',
          departureTime: '21:40',
          arrivalTime: '04:15',
          durationHours: 6.58,
          distanceKm: 340.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 101, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '21:40', arrivalTime: null },
            { id: 102, stationCode: 'MS', stationName: 'Chennai Egmore (MS)', stopSequence: 2, distanceFromSourceKm: 5, departureTime: '22:00', arrivalTime: '21:55' },
            { id: 103, stationCode: 'TPJ', stationName: 'Tiruchchirappalli (TPJ)', stopSequence: 3, distanceFromSourceKm: 340, departureTime: null, arrivalTime: '04:15' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 12, fare: 1450.00, status: 'AVAILABLE (12)' },
            { coachType: '2A', availableSeats: 32, fare: 980.00, status: 'AVAILABLE (32)' },
            { coachType: '3A', availableSeats: 74, fare: 535.50, status: 'AVAILABLE (74)' },
            { coachType: 'SL', availableSeats: 140, fare: 215.00, status: 'AVAILABLE (140)' }
          ]
        },
        {
          id: 23,
          trainNumber: '12635',
          trainName: 'Vaigai Superfast Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'MS',
          fromStationName: 'Chennai Egmore (MS)',
          toStationCode: 'TPJ',
          toStationName: 'Tiruchchirappalli (TPJ)',
          departureTime: '13:50',
          arrivalTime: '18:55',
          durationHours: 5.08,
          distanceKm: 336.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 104, stationCode: 'MS', stationName: 'Chennai Egmore (MS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '13:50', arrivalTime: null },
            { id: 105, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 2, distanceFromSourceKm: 5, departureTime: '14:05', arrivalTime: '14:00' },
            { id: 106, stationCode: 'TPJ', stationName: 'Tiruchchirappalli (TPJ)', stopSequence: 3, distanceFromSourceKm: 336, departureTime: null, arrivalTime: '18:55' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 90, fare: 485.00, status: 'AVAILABLE (90)' },
            { coachType: '2S', availableSeats: 180, fare: 135.00, status: 'AVAILABLE (180)' }
          ]
        },
        {
          id: 24,
          trainNumber: '20605',
          trainName: 'Tirunelveli Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'MS',
          fromStationName: 'Chennai Egmore (MS)',
          toStationCode: 'TPJ',
          toStationName: 'Tiruchchirappalli (TPJ)',
          departureTime: '14:50',
          arrivalTime: '18:40',
          durationHours: 3.83,
          distanceKm: 336.0,
          runningDays: 'MON,TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 107, stationCode: 'MS', stationName: 'Chennai Egmore (MS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '14:50', arrivalTime: null },
            { id: 108, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 2, distanceFromSourceKm: 5, departureTime: '15:05', arrivalTime: '15:00' },
            { id: 109, stationCode: 'TPJ', stationName: 'Tiruchchirappalli (TPJ)', stopSequence: 3, distanceFromSourceKm: 336, departureTime: null, arrivalTime: '18:40' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 112, fare: 885.00, status: 'AVAILABLE (112)' },
            { coachType: 'EC', availableSeats: 44, fare: 1640.00, status: 'AVAILABLE (44)' }
          ]
        },
        {
          id: 25,
          trainNumber: '12008',
          trainName: 'Shatabdi Express',
          trainType: 'SHATABDI',
          fromStationCode: 'MYS',
          fromStationName: 'Mysuru (MYS)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '14:15',
          arrivalTime: '21:30',
          durationHours: 7.25,
          distanceKm: 497.0,
          runningDays: 'MON,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 110, stationCode: 'MYS', stationName: 'Mysuru (MYS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '14:15', arrivalTime: null },
            { id: 111, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 2, distanceFromSourceKm: 138, departureTime: '16:25', arrivalTime: '16:20' },
            { id: 112, stationCode: 'KPD', stationName: 'Katpadi Junction (KPD)', stopSequence: 3, distanceFromSourceKm: 367, departureTime: '19:25', arrivalTime: '19:23' },
            { id: 113, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 4, distanceFromSourceKm: 497, departureTime: null, arrivalTime: '21:30' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 96, fare: 880.00, status: 'AVAILABLE (96)' },
            { coachType: 'EC', availableSeats: 38, fare: 1530.00, status: 'AVAILABLE (38)' }
          ]
        },
        {
          id: 26,
          trainNumber: '12675',
          trainName: 'Kovai Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'MAS',
          fromStationName: 'Chennai Central (MAS)',
          toStationCode: 'CBE',
          toStationName: 'Coimbatore Junction (CBE)',
          departureTime: '06:10',
          arrivalTime: '14:05',
          durationHours: 7.92,
          distanceKm: 494.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 114, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:10', arrivalTime: null },
            { id: 115, stationCode: 'KPD', stationName: 'Katpadi Junction (KPD)', stopSequence: 2, distanceFromSourceKm: 130, departureTime: '07:55', arrivalTime: '07:53' },
            { id: 116, stationCode: 'CBE', stationName: 'Coimbatore Junction (CBE)', stopSequence: 3, distanceFromSourceKm: 494, departureTime: null, arrivalTime: '14:05' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 104, fare: 590.00, status: 'AVAILABLE (104)' },
            { coachType: '2S', availableSeats: 210, fare: 180.00, status: 'AVAILABLE (210)' }
          ]
        },
        {
          id: 27,
          trainNumber: '12676',
          trainName: 'Kovai Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'CBE',
          fromStationName: 'Coimbatore Junction (CBE)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '15:15',
          arrivalTime: '23:15',
          durationHours: 8.0,
          distanceKm: 494.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 117, stationCode: 'CBE', stationName: 'Coimbatore Junction (CBE)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '15:15', arrivalTime: null },
            { id: 118, stationCode: 'KPD', stationName: 'Katpadi Junction (KPD)', stopSequence: 2, distanceFromSourceKm: 364, departureTime: '21:20', arrivalTime: '21:18' },
            { id: 119, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 3, distanceFromSourceKm: 494, departureTime: null, arrivalTime: '23:15' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 88, fare: 590.00, status: 'AVAILABLE (88)' },
            { coachType: '2S', availableSeats: 195, fare: 180.00, status: 'AVAILABLE (195)' }
          ]
        },
        {
          id: 28,
          trainNumber: '12302',
          trainName: 'Howrah Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'HWH',
          toStationName: 'Howrah Junction (HWH)',
          departureTime: '16:50',
          arrivalTime: '09:55',
          durationHours: 17.08,
          distanceKm: 1451.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SUN',
          active: true,
          routes: [
            { id: 120, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '16:50', arrivalTime: null },
            { id: 121, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 440, departureTime: '21:37', arrivalTime: '21:32' },
            { id: 122, stationCode: 'BSB', stationName: 'Varanasi Junction (BSB)', stopSequence: 3, distanceFromSourceKm: 760, departureTime: '01:35', arrivalTime: '01:25' },
            { id: 123, stationCode: 'HWH', stationName: 'Howrah Junction (HWH)', stopSequence: 4, distanceFromSourceKm: 1451, departureTime: null, arrivalTime: '09:55' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 14, fare: 4890.00, status: 'AVAILABLE (14)' },
            { coachType: '2A', availableSeats: 36, fare: 2950.00, status: 'AVAILABLE (36)' },
            { coachType: '3A', availableSeats: 92, fare: 2140.00, status: 'AVAILABLE (92)' }
          ]
        },
        {
          id: 29,
          trainNumber: '12434',
          trainName: 'Chennai Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'MAS',
          toStationName: 'Chennai Central (MAS)',
          departureTime: '15:35',
          arrivalTime: '20:45',
          durationHours: 29.17,
          distanceKm: 2175.0,
          runningDays: 'WED,FRI',
          active: true,
          routes: [
            { id: 124, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '15:35', arrivalTime: null },
            { id: 125, stationCode: 'BPL', stationName: 'Bhopal Junction (BPL)', stopSequence: 2, distanceFromSourceKm: 700, departureTime: '23:50', arrivalTime: '23:45' },
            { id: 126, stationCode: 'SC', stationName: 'Secunderabad Junction (SC)', stopSequence: 3, distanceFromSourceKm: 1475, departureTime: '08:55', arrivalTime: '08:50' },
            { id: 127, stationCode: 'MAS', stationName: 'Chennai Central (MAS)', stopSequence: 4, distanceFromSourceKm: 2175, departureTime: null, arrivalTime: '20:45' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 10, fare: 5650.00, status: 'AVAILABLE (10)' },
            { coachType: '2A', availableSeats: 28, fare: 3480.00, status: 'AVAILABLE (28)' },
            { coachType: '3A', availableSeats: 80, fare: 2590.00, status: 'AVAILABLE (80)' }
          ]
        },
        {
          id: 30,
          trainNumber: '22692',
          trainName: 'Bengaluru Rajdhani Express',
          trainType: 'RAJDHANI',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'SBC',
          toStationName: 'KSR Bengaluru (SBC)',
          departureTime: '20:45',
          arrivalTime: '05:20',
          durationHours: 32.58,
          distanceKm: 2365.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 128, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '20:45', arrivalTime: null },
            { id: 129, stationCode: 'BPL', stationName: 'Bhopal Junction (BPL)', stopSequence: 2, distanceFromSourceKm: 700, departureTime: '05:30', arrivalTime: '05:25' },
            { id: 130, stationCode: 'SC', stationName: 'Secunderabad Junction (SC)', stopSequence: 3, distanceFromSourceKm: 1475, departureTime: '15:15', arrivalTime: '15:10' },
            { id: 131, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 4, distanceFromSourceKm: 2365, departureTime: null, arrivalTime: '05:20' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 12, fare: 5880.00, status: 'AVAILABLE (12)' },
            { coachType: '2A', availableSeats: 32, fare: 3620.00, status: 'AVAILABLE (32)' },
            { coachType: '3A', availableSeats: 86, fare: 2680.00, status: 'AVAILABLE (86)' }
          ]
        },
        {
          id: 31,
          trainNumber: '12724',
          trainName: 'Telangana Superfast Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'HYB',
          toStationName: 'Hyderabad Deccan (HYB)',
          departureTime: '16:00',
          arrivalTime: '17:10',
          durationHours: 25.17,
          distanceKm: 1672.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 132, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '16:00', arrivalTime: null },
            { id: 133, stationCode: 'BPL', stationName: 'Bhopal Junction (BPL)', stopSequence: 2, distanceFromSourceKm: 700, departureTime: '00:25', arrivalTime: '00:20' },
            { id: 134, stationCode: 'SC', stationName: 'Secunderabad Junction (SC)', stopSequence: 3, distanceFromSourceKm: 1665, departureTime: '16:00', arrivalTime: '15:55' },
            { id: 135, stationCode: 'HYB', stationName: 'Hyderabad Deccan (HYB)', stopSequence: 4, distanceFromSourceKm: 1672, departureTime: null, arrivalTime: '17:10' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 8, fare: 4120.00, status: 'AVAILABLE (8)' },
            { coachType: '2A', availableSeats: 26, fare: 2450.00, status: 'AVAILABLE (26)' },
            { coachType: '3A', availableSeats: 68, fare: 1710.00, status: 'AVAILABLE (68)' },
            { coachType: 'SL', availableSeats: 120, fare: 655.00, status: 'AVAILABLE (120)' }
          ]
        },
        {
          id: 32,
          trainNumber: '12124',
          trainName: 'Deccan Queen Superfast',
          trainType: 'SUPERFAST',
          fromStationCode: 'PUNE',
          fromStationName: 'Pune Junction (PUNE)',
          toStationCode: 'CSMT',
          toStationName: 'Mumbai CSMT (CSMT)',
          departureTime: '07:15',
          arrivalTime: '10:25',
          durationHours: 3.17,
          distanceKm: 192.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 136, stationCode: 'PUNE', stationName: 'Pune Junction (PUNE)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '07:15', arrivalTime: null },
            { id: 137, stationCode: 'CSMT', stationName: 'Mumbai CSMT (CSMT)', stopSequence: 2, distanceFromSourceKm: 192, departureTime: null, arrivalTime: '10:25' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 110, fare: 390.00, status: 'AVAILABLE (110)' },
            { coachType: '2S', availableSeats: 230, fare: 110.00, status: 'AVAILABLE (230)' }
          ]
        },
        {
          id: 33,
          trainNumber: '12123',
          trainName: 'Deccan Queen Superfast',
          trainType: 'SUPERFAST',
          fromStationCode: 'CSMT',
          fromStationName: 'Mumbai CSMT (CSMT)',
          toStationCode: 'PUNE',
          toStationName: 'Pune Junction (PUNE)',
          departureTime: '17:10',
          arrivalTime: '20:25',
          durationHours: 3.25,
          distanceKm: 192.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 138, stationCode: 'CSMT', stationName: 'Mumbai CSMT (CSMT)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '17:10', arrivalTime: null },
            { id: 139, stationCode: 'PUNE', stationName: 'Pune Junction (PUNE)', stopSequence: 2, distanceFromSourceKm: 192, departureTime: null, arrivalTime: '20:25' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 98, fare: 390.00, status: 'AVAILABLE (98)' },
            { coachType: '2S', availableSeats: 215, fare: 110.00, status: 'AVAILABLE (215)' }
          ]
        },
        {
          id: 34,
          trainNumber: '12785',
          trainName: 'Kacheguda Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'SBC',
          fromStationName: 'KSR Bengaluru (SBC)',
          toStationCode: 'HYB',
          toStationName: 'Hyderabad Deccan (HYB)',
          departureTime: '18:20',
          arrivalTime: '05:40',
          durationHours: 11.33,
          distanceKm: 618.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 140, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '18:20', arrivalTime: null },
            { id: 141, stationCode: 'SC', stationName: 'Secunderabad Junction (SC)', stopSequence: 2, distanceFromSourceKm: 610, departureTime: '05:15', arrivalTime: '05:10' },
            { id: 142, stationCode: 'HYB', stationName: 'Hyderabad Deccan (HYB)', stopSequence: 3, distanceFromSourceKm: 618, departureTime: null, arrivalTime: '05:40' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 10, fare: 2150.00, status: 'AVAILABLE (10)' },
            { coachType: '2A', availableSeats: 30, fare: 1290.00, status: 'AVAILABLE (30)' },
            { coachType: '3A', availableSeats: 80, fare: 910.00, status: 'AVAILABLE (80)' },
            { coachType: 'SL', availableSeats: 150, fare: 350.00, status: 'AVAILABLE (150)' }
          ]
        },
        {
          id: 35,
          trainNumber: '12786',
          trainName: 'Bengaluru Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'HYB',
          fromStationName: 'Hyderabad Deccan (HYB)',
          toStationCode: 'SBC',
          toStationName: 'KSR Bengaluru (SBC)',
          departureTime: '19:05',
          arrivalTime: '06:25',
          durationHours: 11.33,
          distanceKm: 618.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 143, stationCode: 'HYB', stationName: 'Hyderabad Deccan (HYB)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '19:05', arrivalTime: null },
            { id: 144, stationCode: 'SC', stationName: 'Secunderabad Junction (SC)', stopSequence: 2, distanceFromSourceKm: 8, departureTime: '19:35', arrivalTime: '19:30' },
            { id: 145, stationCode: 'SBC', stationName: 'Bengaluru (SBC)', stopSequence: 3, distanceFromSourceKm: 618, departureTime: null, arrivalTime: '06:25' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 12, fare: 2150.00, status: 'AVAILABLE (12)' },
            { coachType: '2A', availableSeats: 34, fare: 1290.00, status: 'AVAILABLE (34)' },
            { coachType: '3A', availableSeats: 82, fare: 910.00, status: 'AVAILABLE (82)' },
            { coachType: 'SL', availableSeats: 160, fare: 350.00, status: 'AVAILABLE (160)' }
          ]
        },
        {
          id: 36,
          trainNumber: '12003',
          trainName: 'Lucknow Shatabdi Express',
          trainType: 'SHATABDI',
          fromStationCode: 'LKO',
          fromStationName: 'Lucknow Charbagh (LKO)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '15:30',
          arrivalTime: '22:25',
          durationHours: 6.92,
          distanceKm: 512.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 146, stationCode: 'LKO', stationName: 'Lucknow Charbagh (LKO)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '15:30', arrivalTime: null },
            { id: 147, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 72, departureTime: '16:55', arrivalTime: '16:50' },
            { id: 148, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 3, distanceFromSourceKm: 512, departureTime: null, arrivalTime: '22:25' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 108, fare: 980.00, status: 'AVAILABLE (108)' },
            { coachType: 'EC', availableSeats: 42, fare: 1720.00, status: 'AVAILABLE (42)' }
          ]
        },
        {
          id: 37,
          trainNumber: '12394',
          trainName: 'Sampoorna Kranti Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'PNBE',
          toStationName: 'Patna Junction (PNBE)',
          departureTime: '17:30',
          arrivalTime: '06:50',
          durationHours: 13.33,
          distanceKm: 1002.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 149, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '17:30', arrivalTime: null },
            { id: 150, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 440, departureTime: '22:27', arrivalTime: '22:22' },
            { id: 151, stationCode: 'PNBE', stationName: 'Patna Junction (PNBE)', stopSequence: 3, distanceFromSourceKm: 1002, departureTime: null, arrivalTime: '06:50' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 10, fare: 3290.00, status: 'AVAILABLE (10)' },
            { coachType: '2A', availableSeats: 32, fare: 1940.00, status: 'AVAILABLE (32)' },
            { coachType: '3A', availableSeats: 88, fare: 1360.00, status: 'AVAILABLE (88)' },
            { coachType: 'SL', availableSeats: 160, fare: 520.00, status: 'AVAILABLE (160)' }
          ]
        },
        {
          id: 38,
          trainNumber: '12393',
          trainName: 'Sampoorna Kranti Express',
          trainType: 'SUPERFAST',
          fromStationCode: 'PNBE',
          fromStationName: 'Patna Junction (PNBE)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '19:25',
          arrivalTime: '07:55',
          durationHours: 12.5,
          distanceKm: 1002.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 152, stationCode: 'PNBE', stationName: 'Patna Junction (PNBE)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '19:25', arrivalTime: null },
            { id: 153, stationCode: 'CNB', stationName: 'Kanpur Central (CNB)', stopSequence: 2, distanceFromSourceKm: 562, departureTime: '02:30', arrivalTime: '02:25' },
            { id: 154, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 3, distanceFromSourceKm: 1002, departureTime: null, arrivalTime: '07:55' }
          ],
          availableClasses: [
            { coachType: '1A', availableSeats: 12, fare: 3290.00, status: 'AVAILABLE (12)' },
            { coachType: '2A', availableSeats: 30, fare: 1940.00, status: 'AVAILABLE (30)' },
            { coachType: '3A', availableSeats: 85, fare: 1360.00, status: 'AVAILABLE (85)' },
            { coachType: 'SL', availableSeats: 155, fare: 520.00, status: 'AVAILABLE (155)' }
          ]
        },
        {
          id: 39,
          trainNumber: '20633',
          trainName: 'Kasaragod Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'TVC',
          fromStationName: 'Thiruvananthapuram (TVC)',
          toStationCode: 'CLT',
          toStationName: 'Kozhikode (CLT)',
          departureTime: '05:20',
          arrivalTime: '11:03',
          durationHours: 5.72,
          distanceKm: 398.0,
          runningDays: 'MON,TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 155, stationCode: 'TVC', stationName: 'Thiruvananthapuram Central (TVC)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '05:20', arrivalTime: null },
            { id: 156, stationCode: 'ERN', stationName: 'Ernakulam Town (ERN)', stopSequence: 2, distanceFromSourceKm: 206, departureTime: '08:20', arrivalTime: '08:17' },
            { id: 157, stationCode: 'CLT', stationName: 'Kozhikode (CLT)', stopSequence: 3, distanceFromSourceKm: 398, departureTime: null, arrivalTime: '11:03' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 110, fare: 950.00, status: 'AVAILABLE (110)' },
            { coachType: 'EC', availableSeats: 40, fare: 1780.00, status: 'AVAILABLE (40)' }
          ]
        },
        {
          id: 40,
          trainNumber: '20634',
          trainName: 'Thiruvananthapuram Vande Bharat Express',
          trainType: 'VANDE_BHARAT',
          fromStationCode: 'CLT',
          fromStationName: 'Kozhikode (CLT)',
          toStationCode: 'TVC',
          toStationName: 'Thiruvananthapuram (TVC)',
          departureTime: '14:30',
          arrivalTime: '20:35',
          durationHours: 6.08,
          distanceKm: 398.0,
          runningDays: 'MON,TUE,WED,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 158, stationCode: 'CLT', stationName: 'Kozhikode (CLT)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '14:30', arrivalTime: null },
            { id: 159, stationCode: 'ERN', stationName: 'Ernakulam Town (ERN)', stopSequence: 2, distanceFromSourceKm: 192, departureTime: '17:18', arrivalTime: '17:15' },
            { id: 160, stationCode: 'TVC', stationName: 'Thiruvananthapuram Central (TVC)', stopSequence: 3, distanceFromSourceKm: 398, departureTime: null, arrivalTime: '20:35' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 105, fare: 950.00, status: 'AVAILABLE (105)' },
            { coachType: 'EC', availableSeats: 38, fare: 1780.00, status: 'AVAILABLE (38)' }
          ]
        },
        {
          id: 41,
          trainNumber: '12986',
          trainName: 'Jaipur Double Decker Express',
          trainType: 'DOUBLE_DECKER',
          fromStationCode: 'JP',
          fromStationName: 'Jaipur Junction (JP)',
          toStationCode: 'NDLS',
          toStationName: 'New Delhi (NDLS)',
          departureTime: '06:00',
          arrivalTime: '10:30',
          durationHours: 4.5,
          distanceKm: 303.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 161, stationCode: 'JP', stationName: 'Jaipur Junction (JP)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '06:00', arrivalTime: null },
            { id: 162, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 2, distanceFromSourceKm: 303, departureTime: null, arrivalTime: '10:30' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 140, fare: 495.00, status: 'AVAILABLE (140)' }
          ]
        },
        {
          id: 42,
          trainNumber: '12985',
          trainName: 'Jaipur Double Decker Express',
          trainType: 'DOUBLE_DECKER',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi (NDLS)',
          toStationCode: 'JP',
          toStationName: 'Jaipur Junction (JP)',
          departureTime: '17:35',
          arrivalTime: '22:05',
          durationHours: 4.5,
          distanceKm: 303.0,
          runningDays: 'MON,TUE,WED,THU,FRI,SAT,SUN',
          active: true,
          routes: [
            { id: 163, stationCode: 'NDLS', stationName: 'New Delhi (NDLS)', stopSequence: 1, distanceFromSourceKm: 0, departureTime: '17:35', arrivalTime: null },
            { id: 164, stationCode: 'JP', stationName: 'Jaipur Junction (JP)', stopSequence: 2, distanceFromSourceKm: 303, departureTime: null, arrivalTime: '22:05' }
          ],
          availableClasses: [
            { coachType: 'CC', availableSeats: 135, fare: 495.00, status: 'AVAILABLE (135)' }
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
      const fromClusters = getClusterCodes(from);
      const toClusters = getClusterCodes(to);

      let matchedTrains = [];

      if (fromClusters.length === 0 && toClusters.length === 0) {
        matchedTrains = db.trains.map(t => ({
          ...t,
          trainId: t.trainId || t.id,
          id: t.id || t.trainId
        }));
      } else {
        matchedTrains = db.trains.filter(t => {
          const hasFrom = fromClusters.length === 0 || fromClusters.some(fc =>
            (t.routes && t.routes.some(r => r.stationCode.toUpperCase() === fc || normalizeStation(r.stationCode) === fc || r.stationName.toUpperCase().includes(fc))) ||
            t.fromStationCode.toUpperCase() === fc ||
            normalizeStation(t.fromStationName) === fc
          );

          const hasTo = toClusters.length === 0 || toClusters.some(tc =>
            (t.routes && t.routes.some(r => r.stationCode.toUpperCase() === tc || normalizeStation(r.stationCode) === tc || r.stationName.toUpperCase().includes(tc))) ||
            t.toStationCode.toUpperCase() === tc ||
            normalizeStation(t.toStationName) === tc
          );

          if (!hasFrom || !hasTo) return false;

          if (fromClusters.length > 0 && toClusters.length > 0 && t.routes && t.routes.length > 1) {
            let earliestFromIdx = 999;
            let latestToIdx = -1;

            fromClusters.forEach(fc => {
              const idx = t.routes.findIndex(r => r.stationCode.toUpperCase() === fc || normalizeStation(r.stationCode) === fc || r.stationName.toUpperCase().includes(fc));
              if (idx !== -1 && idx < earliestFromIdx) earliestFromIdx = idx;
            });

            toClusters.forEach(tc => {
              const idx = t.routes.findIndex(r => r.stationCode.toUpperCase() === tc || normalizeStation(r.stationCode) === tc || r.stationName.toUpperCase().includes(tc));
              if (idx !== -1 && idx > latestToIdx) latestToIdx = idx;
            });

            if (earliestFromIdx !== 999 && latestToIdx !== -1) {
              return earliestFromIdx < latestToIdx;
            }
          }
          return true;
        }).map(t => {
          let depTime = t.departureTime;
          let arrTime = t.arrivalTime;
          let fromName = t.fromStationName;
          let toName = t.toStationName;
          let dist = t.distanceKm;

          if (t.routes && t.routes.length > 0) {
            for (const fc of fromClusters) {
              const r = t.routes.find(route => route.stationCode.toUpperCase() === fc || normalizeStation(route.stationCode) === fc || route.stationName.toUpperCase().includes(fc));
              if (r) {
                if (r.departureTime) depTime = r.departureTime;
                fromName = r.stationName;
                break;
              }
            }
            for (const tc of toClusters) {
              const r = t.routes.find(route => route.stationCode.toUpperCase() === tc || normalizeStation(route.stationCode) === tc || route.stationName.toUpperCase().includes(tc));
              if (r) {
                if (r.arrivalTime) arrTime = r.arrivalTime;
                toName = r.stationName;
                break;
              }
            }
          }

          return {
            ...t,
            trainId: t.trainId || t.id,
            id: t.id || t.trainId,
            departureTime: depTime,
            arrivalTime: arrTime,
            fromStationName: fromName,
            toStationName: toName,
            distanceKm: dist
          };
        });
      }

      // If specific search pair has 0 trains, fallback to all fleet trains
      if (!matchedTrains || matchedTrains.length === 0) {
        matchedTrains = db.trains.map(t => ({
          ...t,
          trainId: t.trainId || t.id,
          id: t.id || t.trainId
        }));
      }

      return matchedTrains;
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
      return loadDB().trains.map(t => ({
        ...t,
        trainId: t.trainId || t.id,
        id: t.id || t.trainId
      }));
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
