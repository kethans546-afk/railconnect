/**
 * RAILCONNECT — Central Frontend API Client
 * Seamlessly interfaces with the Java Spring Boot Backend on http://localhost:8080
 */

const API_BASE = (typeof window !== 'undefined' && window.location.protocol.startsWith('http') && window.location.port === '8080') ? '/api' : 'http://localhost:8080/api';

const Api = {
  getToken() {
    return localStorage.getItem('railconnect_token');
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('railconnect_token', token);
    } else {
      localStorage.removeItem('railconnect_token');
    }
  },

  getUser() {
    const raw = localStorage.getItem('railconnect_user');
    return raw ? JSON.parse(raw) : null;
  },

  setUser(user) {
    if (user) {
      localStorage.setItem('railconnect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('railconnect_user');
    }
  },

  async request(endpoint, options = {}) {
    const isGitHubPages = typeof window !== 'undefined' && (window.location.hostname.endsWith('github.io') || window.location.protocol === 'file:');

    if (!isGitHubPages) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        const token = this.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(`${API_BASE}${endpoint}`, {
          ...options,
          headers,
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const text = await response.text();
        let data = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch (parseErr) {
          data = { message: text };
        }

        if (response.status === 401) {
          localStorage.removeItem('railconnect_token');
          localStorage.removeItem('railconnect_user');
        }

        if (response.ok) {
          return data;
        }
        console.warn(`Server responded with ${response.status}, evaluating simulation fallback.`);
      } catch (err) {
        console.warn(`[RailConnect Backend Offline on ${endpoint}]: Falling back to in-browser simulation engine`);
      }
    }

    if (window.RailConnectMockEngine) {
      return this.dispatchMock(endpoint, options);
    }
    throw new Error('Service currently unavailable');
  },

  dispatchMock(endpoint, options = {}) {
    const mock = window.RailConnectMockEngine;
    const body = options.body ? JSON.parse(options.body) : {};
    const method = options.method || 'GET';

    if (endpoint === '/auth/login') return mock.login(body.username, body.password);
    if (endpoint === '/auth/register') return mock.register(body);
    if (endpoint === '/auth/me') return mock.login(this.getUser()?.username || 'admin');
    if (endpoint === '/trains/stations') return mock.getStations();
    if (endpoint.startsWith('/trains/search')) {
      const url = new URL('http://dummy' + endpoint);
      return mock.searchTrains(url.searchParams.get('from'), url.searchParams.get('to'), url.searchParams.get('date'));
    }
    if (endpoint === '/seats/lock') return mock.lockSeat(body.seatId, body.durationMinutes);
    if (endpoint === '/seats/unlock') return mock.unlockSeat(body.seatId);
    if (endpoint.startsWith('/seats/layout/')) {
      const coachId = endpoint.split('/').pop();
      return mock.getCoachLayout(coachId);
    }
    if (endpoint === '/seats/auto-allocate') {
      return mock.autoAllocateSeats(body.trainId, body.coachType, body.passengers, body.journeyDate);
    }
    if (endpoint.startsWith('/seats/coaches/')) {
      const coachType = sessionStorage.getItem('rc_coachType') || '3A';
      return [
        { id: 1, coachNumber: coachType === 'CC' ? 'C1' : coachType === 'EC' ? 'E1' : coachType === '2A' ? 'A1' : coachType === '1A' ? 'H1' : coachType === 'SL' ? 'S1' : 'B1', coachType: coachType, totalSeats: 40 }
      ];
    }
    if (endpoint.startsWith('/seats/available/')) return [1, 2, 5, 8, 12, 15, 18, 22, 25, 30];
    if (endpoint === '/bookings/create') return mock.createBooking(body);
    if (endpoint === '/bookings/my') return mock.getDB().bookings;
    if (endpoint.startsWith('/pnr/')) {
      const pnr = endpoint.replace('/pnr/', '');
      return mock.getPnrStatus(pnr);
    }
    if (endpoint.startsWith('/weather/journey')) {
      const url = new URL('http://dummy' + endpoint);
      return mock.getJourneyWeather(url.searchParams.get('from'), url.searchParams.get('to'), url.searchParams.get('date'));
    }
    if (endpoint.startsWith('/tickets/qr')) {
      return { qrImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAAA4klEQVR4Xu2USw7EIAxD3RXH4KYt3JRjsCpjp51qvut6gYVQmtcFipNg/BM+E5cmmUSaxIZ0UMtoQC4KsxNRWDvhqM9PH1KQa8/14IZktDW5Enmu242MqCXSt9u3k5gSuq3nv0/J7eRQj8QlE9LBHiwsZ9jOwIjI6jy6ciVpVqzIkaPRa2q03Ym0TUVtG38RjJwNWWJE9rBa1TUioR6LGdoxRuTcLjprPNyJZF41+pHxbkYKopypAYrtiDqRVqsr7QgrCrldzQgvvToWzCkXwkpqRLY4eO3E28lPTTKJNIk3eQCoOFRqAPJjvgAAAABJRU5ErkJggg==' };
    }
    if (endpoint === '/admin/dashboard') return mock.getDashboardStats();
    if (endpoint === '/admin/stations') {
      if (method === 'POST') return mock.addStation(body);
      return mock.getStations();
    }
    if (endpoint.startsWith('/admin/stations/')) {
      const stationId = endpoint.split('/').pop();
      if (method === 'DELETE') return mock.removeStation(stationId);
    }
    if (endpoint === '/admin/trains') {
      if (method === 'POST') return mock.addTrain(body);
      return mock.getAllTrains();
    }
    if (endpoint.startsWith('/admin/trains/') && endpoint.endsWith('/routes')) {
      const parts = endpoint.split('/');
      const trainId = parts[3];
      if (method === 'POST') return mock.addRouteStop(trainId, body);
      return mock.getTrainRoutes(trainId);
    }
    if (endpoint.startsWith('/admin/trains/routes/')) {
      const routeId = endpoint.split('/').pop();
      return mock.removeRouteStop(routeId);
    }
    if (endpoint.startsWith('/admin/trains/')) {
      const trainId = endpoint.split('/').pop();
      if (method === 'DELETE') return mock.removeTrain(trainId);
    }
    if (endpoint === '/admin/fares') {
      if (method === 'POST') return mock.configureFare(body);
      return mock.getAllFares();
    }
    if (endpoint === '/admin/audits') return mock.getAuditLogs();
    if (endpoint === '/tickets/verify') return mock.verifyTicket(body.pnrOrTicketId, body.comments);
    if (endpoint.startsWith('/berth-exchange/eligible')) {
      return [
        { bookingId: 101, passengerId: 201, passengerName: 'Rahul Sharma', coach: 'B1', seatNumber: 1, berthType: 'LOWER', status: 'CONFIRMED' }
      ];
    }
    if (endpoint === '/berth-exchange/request') {
      return { id: Date.now(), status: 'REQUESTED', message: 'Swap request submitted' };
    }
    if (endpoint === '/berth-exchange/my') {
      return mock.getDB().exchanges;
    }

    // --- AI Multilingual Chatbot & Voice Assistant Endpoints ---
    if (endpoint === '/ai/supported-languages') {
      return [
        { code: 'en', name: 'English', nativeName: 'English', bcp47: 'en-IN' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', bcp47: 'hi-IN' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', bcp47: 'te-IN' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', bcp47: 'ta-IN' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', bcp47: 'kn-IN' },
        { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', bcp47: 'ml-IN' },
        { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', bcp47: 'bn-IN' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी', bcp47: 'mr-IN' }
      ];
    }
    if (endpoint === '/ai/language/detect') {
      const text = body.text || '';
      let code = 'en';
      if (/[\u0C00-\u0C7F]/.test(text)) code = 'te';
      else if (/[\u0B80-\u0BFF]/.test(text)) code = 'ta';
      else if (/[\u0C80-\u0CFF]/.test(text)) code = 'kn';
      else if (/[\u0D00-\u0D7F]/.test(text)) code = 'ml';
      else if (/[\u0980-\u09FF]/.test(text)) code = 'bn';
      else if (/[\u0900-\u097F]/.test(text)) code = 'hi';
      return { languageCode: code, detectedScript: code.toUpperCase(), confidence: 0.95 };
    }
    if (endpoint === '/ai/chat') {
      const msg = (body.message || '').trim();
      const lower = msg.toLowerCase();
      let lang = body.language || 'en';

      // Auto-detect language script
      if (/[\u0C00-\u0C7F]/.test(msg)) lang = 'te';
      else if (/[\u0B80-\u0BFF]/.test(msg)) lang = 'ta';
      else if (/[\u0C80-\u0CFF]/.test(msg)) lang = 'kn';
      else if (/[\u0D00-\u0D7F]/.test(msg)) lang = 'ml';
      else if (/[\u0980-\u09FF]/.test(msg)) lang = 'bn';
      else if (/[\u0900-\u097F]/.test(msg) && lang !== 'mr') lang = 'hi';

      let reply = '';
      let intent = 'GENERAL_QUERY';
      let trainCards = [];
      let suggestedQuestions = [];

      // Check for 10-digit PNR in message
      const pnrMatch = msg.match(/\b\d{10}\b/);
      const isPnrQuery = !!pnrMatch || lower.includes('pnr') || lower.includes('status') ||
        lower.includes('పిఎన్‌ఆర్') || lower.includes('పిఎన్ఆర్') || lower.includes('స్టేటస్') ||
        lower.includes('पीएनआर') || lower.includes('स्थिति') ||
        lower.includes('பிஎன்ஆர்') || lower.includes('நிலை') ||
        lower.includes('ಪಿಎನ್‌ಆರ್') || lower.includes('സ്ഥിതി') ||
        lower.includes('പിഎൻആർ') || lower.includes('പരിശോധിക്കുക') ||
        lower.includes('স্ট্যাটাস') || lower.includes('स्थिती');

      const isTrainSearch = lower.includes('train') || lower.includes('search') || lower.includes('express') ||
        lower.includes('రైలు') || lower.includes('రైళ్లు') || lower.includes('రైళ్ల') || lower.includes('ట్రైన్') || lower.includes('చూపించు') ||
        lower.includes('ट्रेन') || lower.includes('गाड़ी') || lower.includes('रेल') || lower.includes('खोज') ||
        lower.includes('ரயில்') || lower.includes('ரயில்கள்') || lower.includes('வண்டி') ||
        lower.includes('ರೈಲು') || lower.includes('ರೈಲುಗಳು') || lower.includes('ಹುಡುಕಿ') ||
        lower.includes('ട്രെയിൻ') || lower.includes('ട്രെയിനുകൾ') || lower.includes('വണ്ടി') ||
        lower.includes('ট্রেন') || lower.includes('অনুসন্ধান') ||
        lower.includes('गाड्या') || lower.includes('गाडी') || lower.includes('शोधा');

      const isWeatherQuery = lower.includes('weather') || lower.includes('rain') || lower.includes('climate') ||
        lower.includes('వాతావరణ') || lower.includes('వర్షం') ||
        lower.includes('मौसम') || lower.includes('बारिश') ||
        lower.includes('வானிலை') || lower.includes('மழை') ||
        lower.includes('ಹವಾಮಾನ') || lower.includes('ಮಳೆ') ||
        lower.includes('കാലാവസ്ഥ') || lower.includes('আবহাওয়া') || lower.includes('हवामान');

      const isTatkalQuery = lower.includes('tatkal') || lower.includes('rule') || lower.includes('procedure') ||
        lower.includes('తత్కాల్') || lower.includes('तत्काल') || lower.includes('தட்கல்') || lower.includes('ತತ್ಕಾಲ್') || lower.includes('തത്കാൽ') || lower.includes('তৎকাল');

      const isBerthQuery = lower.includes('berth') || lower.includes('exchange') || lower.includes('swap') ||
        lower.includes('బర్త్') || lower.includes('बर्थ') || lower.includes('பர்த்') || lower.includes('ಬರ್ತ್') || lower.includes('ബർത്ത്') || lower.includes('বার্থ');

      if (isPnrQuery) {
        intent = 'PNR_STATUS';
        const pnrNum = pnrMatch ? pnrMatch[0] : '4827193056';
        let b = null;
        if (pnrMatch) {
          b = mock.getPnrStatus(pnrNum);
        }
        if (!b) {
          b = mock.getPnrStatus('4827193056') || {
            pnr: pnrNum,
            trainNumber: '12638',
            trainName: 'Pandian Superfast Express',
            fromStationName: 'TPJ (Tiruchirappalli)',
            toStationName: 'MAS (Chennai Central)',
            journeyDate: '2026-10-15',
            coachCode: 'B1',
            passengers: [{ name: 'Rahul Sharma', coach: 'B1', seatNumber: 1, berthType: 'LOWER', status: 'CONFIRMED' }]
          };
        }

        const pName = b.passengers?.[0]?.name || 'Passenger 1';
        const pCoach = b.passengers?.[0]?.coach || b.coachCode || 'B1';
        const pSeat = b.passengers?.[0]?.seatNumber || 1;
        const pBerth = b.passengers?.[0]?.berthType || 'LOWER';
        const pStatus = b.status || 'CONFIRMED';

        if (lang === 'te') {
          reply = `పిఎన్‌ఆర్ విచారణ (${b.pnr || pnrNum}):\n🚆 రైలు: ${b.trainNumber} - ${b.trainName}\n📍 ప్రయాణం: ${b.fromStationName || b.fromStation} ➔ ${b.toStationName || b.toStation}\n📅 తేదీ: ${b.journeyDate}\n👤 ప్రయాణికుడు: ${pName}\n💺 కోచ్ & సీటు: కోచ్ ${pCoach}, సీటు #${pSeat} (${pBerth})\n✅ స్థితి: ${pStatus}`;
          suggestedQuestions = ['ప్రయాణ మార్గ వాతావరణం', 'బర్త్ ఎక్స్‌చేంజ్ విధానం', 'రైలు సమయాలు'];
        } else if (lang === 'hi') {
          reply = `पीएनआर स्थिति (${b.pnr || pnrNum}):\n🚆 ट्रेन: ${b.trainNumber} - ${b.trainName}\n📍 मार्ग: ${b.fromStationName || b.fromStation} ➔ ${b.toStationName || b.toStation}\n📅 यात्रा तिथि: ${b.journeyDate}\n👤 यात्री: ${pName}\n💺 कोच व सीट: कोच ${pCoach}, सीट #${pSeat} (${pBerth})\n✅ आरक्षण स्थिति: ${pStatus}`;
          suggestedQuestions = ['मार्ग मौसम चेतावनी', 'बर्थ एक्सचेंज गाइड', 'तत्काल बुकिंग नियम'];
        } else if (lang === 'ta') {
          reply = `பிஎன்ஆர் நிலை (${b.pnr || pnrNum}):\n🚆 ரயில்: ${b.trainNumber} - ${b.trainName}\n📍 பயணம்: ${b.fromStationName || b.fromStation} ➔ ${b.toStationName || b.toStation}\n📅 தேதி: ${b.journeyDate}\n👤 பயணி: ${pName}\n💺 இருக்கை: கோச் ${pCoach}, இருக்கை #${pSeat} (${pBerth})\n✅ உறுதிப்படுத்தல்: ${pStatus}`;
          suggestedQuestions = ['வானிலை தகவல்', 'பர்த் எக்ஸ்சேஞ்ச் உதவி', 'ரயில் தேடல்'];
        } else if (lang === 'kn') {
          reply = `ಪಿಎನ್‌ಆರ್ ಸ್ಥಿತಿ (${b.pnr || pnrNum}):\n🚆 ರೈಲು: ${b.trainNumber} - ${b.trainName}\n📍 ಮಾರ್ಗ: ${b.fromStationName || b.fromStation} ➔ ${b.toStationName || b.toStation}\n📅 ದಿನಾಂಕ: ${b.journeyDate}\n👤 ಪ್ರಯಾಣಿಕ: ${pName}\n💺 ಕೋಚ್ & ಸೀಟು: ಕೋಚ್ ${pCoach}, ಸೀಟು #${pSeat} (${pBerth})\n✅ ಸ್ಥಿತಿ: ${pStatus}`;
          suggestedQuestions = ['ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ', 'ಬರ್ತ್ ವಿನಿಮಯ', 'ರೈಲುಗಳನ್ನು ಹುಡುಕಿ'];
        } else {
          reply = `PNR Status for ${b.pnr || pnrNum}:\n🚆 Train: ${b.trainNumber} • ${b.trainName}\n📍 Route: ${b.fromStationName || b.fromStation} ➔ ${b.toStationName || b.toStation}\n📅 Date: ${b.journeyDate}\n👤 Passenger: ${pName}\n💺 Berth: Coach ${pCoach}, Seat #${pSeat} (${pBerth})\n✅ Booking Status: ${pStatus}`;
          suggestedQuestions = ['Route Weather Advisory', 'Berth Exchange Guide', 'Search trains Chennai to Trichy'];
        }
      } else if (isTrainSearch) {
        intent = 'TRAIN_SEARCH';
        let matched = [];
        if (lower.includes('bengaluru') || lower.includes('bangalore') || lower.includes('sbc')) {
          matched = mock.searchTrains('SBC', 'MAS');
        } else {
          matched = mock.searchTrains('MAS', 'TPJ');
        }
        if (!matched || matched.length === 0) {
          matched = mock.searchTrains('MAS', 'TPJ');
        }

        trainCards = matched.slice(0, 3).map(t => ({
          trainNumber: t.trainNumber,
          trainName: t.trainName,
          departureTime: t.departureTime || '06:00',
          arrivalTime: t.arrivalTime || '10:40',
          durationHours: t.durationHours ? `${t.durationHours}h` : '4h 40m',
          availableSeats: t.availableSeats || 48,
          fare: t.fare || 667
        }));

        if (lang === 'te') {
          reply = `మీ ప్రయాణ మార్గంలో అందుబాటులో ఉన్న రైళ్లు ఇవిగో:\n1. 20608 వందే భారత్ ఎక్స్‌ప్రెస్ (ఉదయం 06:00, 48 సీట్లు లభ్యం)\n2. 12638 పాండియన్ సూపర్ ఫాస్ట్ (రాత్రి 21:35, 62 సీట్లు లభ్యం)\n3. 12008 శతాబ్ది ఎక్స్‌ప్రెస్ (మధ్యాహ్నం 15:15, 32 సీట్లు లభ్యం)\nఏ రైలునైనా సులభంగా బుక్ చేసుకోండి!`;
          suggestedQuestions = ['పిఎన్‌ఆర్ స్టేటస్', 'వాతావరణ హెచ్చరికలు', 'తత్కాల్ బుకింగ్ నిబంధనలు'];
        } else if (lang === 'hi') {
          reply = `आपके यात्रा मार्ग पर उपलब्ध ट्रेनें:\n1. 20608 वंदे भारत एक्सप्रेस (प्रस्थान 06:00, 48 सीटें उपलब्ध)\n2. 12638 पांडियन सुपरफास्ट एक्सप्रेस (प्रस्थान 21:35, 62 सीटें उपलब्ध)\n3. 12008 शताब्दी एक्सप्रेस (प्रस्थान 15:15, 32 सीटें उपलब्ध)\nकृपया अपनी पसंदीदा ट्रेन चुनें और टिकट बुक करें।`;
          suggestedQuestions = ['पीएनआर स्थिति जांचें', 'मौसम अलर्ट देखें', 'तत्काल बुकिंग नियम'];
        } else if (lang === 'ta') {
          reply = `உங்கள் வழித்தடத்திற்கான விரைவு ரயில்கள்:\n1. 20608 வந்தே பாரத் எக்ஸ்பிரஸ் (காலை 06:00, 48 இருக்கைகள்)\n2. 12638 பாண்டியன் அதிவிரைவு ரயில் (இரவு 21:35, 62 இருக்கைகள்)\n3. 12008 சதாப்தி எக்ஸ்பிரஸ் (மாலை 15:15, 32 இருக்கைகள்)\nஇப்போதே டிக்கெட் முன்பதிவு செய்யலாம்!`;
          suggestedQuestions = ['பிஎன்ஆர் நிலை', 'வானிலை தகவல்', 'தட்கல் விதிகள்'];
        } else if (lang === 'kn') {
          reply = `ನಿಮ್ಮ ಮಾರ್ಗದಲ್ಲಿ ಲಭ್ಯವಿರುವ ಪ್ರಮುಖ ರೈಲುಗಳು:\n1. 20608 ವಂದೇ ಭಾರತ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಬೆಳಿಗ್ಗೆ 06:00, 48 ಸೀಟುಗಳು ಲಭ್ಯ)\n2. 12638 ಪಾಂಡಿಯನ್ ಸೂಪರ್‌ಫಾಸ್ಟ್ (ರಾತ್ರಿ 21:35, 62 ಸೀಟುಗಳು ಲಭ್ಯ)\n3. 12008 ಶತಾಬ್ದಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಮಧ್ಯಾಹ್ನ 15:15, 32 ಸೀಟುಗಳು ಲಭ್ಯ)`;
          suggestedQuestions = ['ಪಿಎನ್‌ಆರ್ ಸ್ಥಿತಿ', 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ', 'ತತ್ಕಾಲ್ ನಿಯಮಗಳು'];
        } else if (lang === 'ml') {
          reply = `നിങ്ങൾക്കായി ലഭ്യമായ പ്രധാന ട്രെയിനുകൾ:\n1. 20608 വന്ദേ ഭാരത് എക്സ്പ്രസ്സ് (06:00, 48 സീറ്റുകൾ ലഭ്യമാണ്)\n2. 12638 പാണ്ഡ്യൻ സൂപ്പർഫാസ്റ്റ് (21:35, 62 സീറ്റുകൾ ലഭ്യമാണ്)\n3. 12008 ശതാബ്ദി എക്സ്പ്രസ്സ് (15:15, 32 സീറ്റുകൾ ലഭ്യമാണ്)`;
          suggestedQuestions = ['പിഎൻആർ പരിശോധിക്കുക', 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്', 'തത്കാൽ നിയമങ്ങൾ'];
        } else if (lang === 'bn') {
          reply = `আপনার ভ্রমণ পথের ট্রেন সমূহ:\n1. 20608 বন্দে ভারত এক্সপ্রেস (সকাল 06:00, 48 টি আসন উপলব্ধ)\n2. 12638 পান্ডিয়ান সুপারফাস্ট (রাত 21:35, 62 টি আসন উপলব্ধ)\n3. 12008 শতাব্দী এক্সপ্রেস (বিকেল 15:15, 32 টি আসন উপলব্ধ)`;
          suggestedQuestions = ['পিএনআর স্ট্যাটাস', 'আবহাওয়া সতর্কতা', 'তৎকাল বুকিং নিয়ম'];
        } else if (lang === 'mr') {
          reply = `आपल्या मार्गावरील उपलब्ध गाड्या:\n1. 20608 वंदे भारत एक्सप्रेस (सकाळी 06:00, 48 जागा उपलब्ध)\n2. 12638 पांडियन सुपरफास्ट (रात्री 21:35, 62 जागा उपलब्ध)\n3. 12008 शताब्दी एक्सप्रेस (दुपारी 15:15, 32 जागा उपलब्ध)`;
          suggestedQuestions = ['पीएनआर स्थिती', 'हवामान अंदाज', 'तत्काळ बुकिंग नियम'];
        } else {
          reply = `Found 3 direct express trains for your corridor:\n1. 20608 Vande Bharat Express (Departs 06:00 • 4h 40m • 48 Seats Available • ₹950)\n2. 12638 Pandian Superfast Express (Departs 21:35 • 7h 40m • 62 Seats Available • ₹530)\n3. 12008 Shatabdi Express (Departs 15:15 • 4h 55m • 32 Seats Available • ₹870)\nClick "Book Now" on any card below to proceed!`;
          suggestedQuestions = ['Check PNR Status', 'Route Weather Advisory', 'Tatkal Booking Rules', 'Berth Exchange Guide'];
        }
      } else if (isWeatherQuery) {
        intent = 'WEATHER_ALERT';
        if (lang === 'te') {
          reply = 'ప్రయాణ మార్గ వాతావరణం: తిరుచ్చిలో 32°C సాధారణం, చెన్నైలో తేలికపాటి వర్షం సూచన (80% వర్షపాతం, 29°C). ప్రయాణ సమయంలో గొడుగు సిద్ధం చేసుకోండి.';
          suggestedQuestions = ['చెన్నై నుంచి తిరుచ్చి రైళ్లు', 'పిఎన్‌ఆర్ స్టేటస్'];
        } else if (lang === 'hi') {
          reply = 'मार्ग मौसम चेतावनी: तिरुचि में 32°C सामान्य है, चेन्नई सेंट्रल में हल्की वर्षा का पूर्वानुमान (80% वर्षा, 29°C) है। कृपया अपनी यात्रा में सावधानी बरतें।';
          suggestedQuestions = ['चेन्नई से तिरुचि ट्रेन खोजें', 'पीएनआर स्थिति जांचें'];
        } else if (lang === 'ta') {
          reply = 'பயண வானிலை அறிக்கை: திருச்சியில் 32°C மிதமான வானிலை, சென்னையில் மழை எச்சரிக்கை (80% மழைப்பொழிவு, 29°C). குடை எடுத்துச் செல்வது நல்லது.';
          suggestedQuestions = ['சென்னை முதல் திருச்சி ரயில்கள்', 'பிஎன்ஆர் நிலை'];
        } else if (lang === 'kn') {
          reply = 'ಮಾರ್ಗ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ: ತಿರುಚಿಯಲ್ಲಿ 32°C ಸಾಧಾರಣ, ಚೆನ್ನೈನಲ್ಲಿ ಮಳೆ ಮುನ್ಸೂಚನೆ (80% ಮಳೆ, 29°C). ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಯಾಣಿಸಿ.';
          suggestedQuestions = ['ಬೆಂಗಳೂರು ರೈಲುಗಳನ್ನು ಹುಡುಕಿ', 'ಪಿಎನ್‌ಆರ್ ಸ್ಥಿತಿ'];
        } else {
          reply = 'Corridor Weather Advisory: Trichy (32°C Clear Skies) ➔ Chennai Central (29°C Rain Warning, 80% precipitation). Umbrella recommended. Safe travels!';
          suggestedQuestions = ['Search trains Chennai to Trichy', 'Check PNR Status'];
        }
      } else if (isTatkalQuery) {
        intent = 'BOOKING_RULES';
        if (lang === 'te') {
          reply = 'తత్కాల్ బుకింగ్ నిబంధనలు:\n• AC తరగతులకు (2A, 3A, CC, EC): ప్రయాణానికి 1 రోజు ముందు ఉదయం 10:00 గంటలకు ప్రారంభమవుతుంది.\n• Non-AC తరగతులకు (SL): ప్రయాణానికి 1 రోజు ముందు ఉదయం 11:00 గంటలకు ప్రారంభమవుతుంది.\n• ధృవీకరించబడిన తత్కాల్ టిక్కెట్లకు రద్దు రీఫండ్ వర్తించదు.';
        } else if (lang === 'hi') {
          reply = 'तत्काल बुकिंग नियम:\n• एसी क्लास (2A, 3A, CC, EC): यात्रा से 1 दिन पूर्व सुबह 10:00 बजे खुलता है।\n• नॉन-एसी क्लास (SL): यात्रा से 1 दिन पूर्व सुबह 11:00 बजे खुलता है।\n• कन्फर्म तत्काल टिकटों पर कैंसिलेशन रिफंड देय नहीं है।';
        } else {
          reply = 'Tatkal Booking Guidelines:\n• AC Classes (2A, 3A, CC, EC): Opens at 10:00 AM, one day prior to journey date.\n• Non-AC Classes (Sleeper): Opens at 11:00 AM, one day prior to journey date.\n• Confirmed Tatkal tickets have zero cancellation refund as per Indian Railways rules.';
        }
        suggestedQuestions = ['Search trains Chennai to Trichy', 'Check PNR Status', 'Route Weather Advisory'];
      } else if (isBerthQuery) {
        intent = 'BERTH_EXCHANGE';
        if (lang === 'te') {
          reply = 'బర్త్ ఎక్స్‌చేంజ్ ఫీచర్: రైల్‌కనెక్ట్ P2P వ్యవస్థ ద్వారా ఒకే కోచ్‌లోని ఇతర ధృవీకరించబడిన ప్రయాణికులతో మీ బర్త్‌ను (ఉదా. అప్పర్ బర్త్ నుంచి లోయర్ బర్త్‌కి) పరస్పర సమ్మతితో మార్చుకోవచ్చు.';
        } else if (lang === 'hi') {
          reply = 'बर्थ एक्सचेंज फीचर: रेलकनेक्ट P2P सिस्टम के माध्यम से एक ही कोच के अन्य कन्फर्म यात्रियों के साथ आप अपनी सीट/बर्थ आपसी सहमति से बदल सकते हैं।';
        } else {
          reply = 'RailConnect P2P Berth Exchange: Confirmed passengers can propose and accept voluntary seat swaps with co-passengers in the same coach (e.g. trading an Upper berth for a Lower berth).';
        }
        suggestedQuestions = ['Search trains Chennai to Trichy', 'Check PNR Status'];
      } else {
        if (lang === 'te') reply = 'నమస్కారం! నేను రైల్‌కనెక్ట్ AI అసిస్టెంట్. రైలు శోధన, లైవ్ పిఎన్‌ఆర్, సీట్ల లభ్యత, వాతావరణం మరియు ప్రయాణ నియమాల్లో నేను మీకు సహాయపడగలను. మీకు ఏమి కావాలి?';
        else if (lang === 'hi') reply = 'नमस्ते! मैं रेलकनेक्ट एआई सहायक हूँ। ट्रेन खोज, पीएनआर स्थिति, सीट उपलब्धता, यात्रा मौसम एवं नियमों में मैं आपकी सहायता कर सकता हूँ।';
        else if (lang === 'ta') reply = 'வணக்கம்! நான் ரயில் கனெக்ட் AI உதவியாளர். ரயில் தேடல், பிஎன்ஆர், மற்றும் இருக்கை விவரங்களுக்கு நான் உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவட்டும்?';
        else if (lang === 'kn') reply = 'ನಮಸ್ಕಾರ! ನಾನು ರೈಲ್‌ಕನೆಕ್ಟ್ AI ಸಹಾಯಕ. ರೈಲು ಹುಡುಕಾಟ, ಪಿಎನ್‌ಆರ್ ಮತ್ತು ಹವಾಮಾನಕ್ಕಾಗಿ ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.';
        else if (lang === 'ml') reply = 'നമസ്കാരം! ഞാൻ റെയിൽകണക്റ്റ് AI അസിസ്റ്റന്റാണ്. ട്രെയിൻ തിരയൽ, പിഎൻആർ, സീറ്റ് ലഭ്യത എന്നിവയ്ക്ക് എന്നോട് ചോദിക്കാം.';
        else if (lang === 'bn') reply = 'নমস্কার! আমি রেলকানেক্ট এআই সহায়ক। ট্রেন অনুসন্ধান, পিএনআর স্থিতি ও আবহাওয়া সতর্কতার জন্য আমাকে জিজ্ঞাসা করুন।';
        else if (lang === 'mr') reply = 'नमस्कार! मी रेलकनेक्ट एआय सहाय्यक आहे. गाडी शोधणे, पीএনआर स्थिती आणि हवामानासाठी मला विचारा.';
        else reply = 'Hello! Welcome to RailConnect AI Assistant. I can help you search trains, check bookings, live PNR status, seat availability, weather advisories, and booking rules.';

        suggestedQuestions = ['Search trains Chennai to Trichy', 'Check PNR Status', 'Route Weather Advisory', 'Tatkal Booking Rules'];
      }

      return {
        reply,
        response: reply,
        language: lang,
        intent,
        trains: trainCards,
        executionMode: 'AUTONOMOUS_DOMAIN_AI',
        suggestedQuestions,
        suggestedNextQueries: suggestedQuestions
      };
    }
    if (endpoint === '/ai/voice/process') {
      return this.dispatchMock('/ai/chat', { body: JSON.stringify({ message: body.recognizedText, language: body.language, sessionId: body.sessionId }) });
    }
    if (endpoint === '/ai/voice/speak') {
      return {
        text: body.text,
        language: body.language || 'en',
        bcp47Code: 'en-IN',
        audioBase64: null,
        audioMimeType: 'audio/wav',
        status: 'SPEECH_SYNTHESIZED_FALLBACK'
      };
    }
    if (endpoint.startsWith('/ai/chat/history')) {
      return [];
    }
    if (endpoint === '/ai/language/preference') {
      return { preferredLanguage: 'en', voiceEnabled: true };
    }

    return { status: 'OK', simulated: true };
  },

  // --------------------------------------------------------------------------
  // Authentication Module Endpoints
  // --------------------------------------------------------------------------
  async login(username, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.setToken(res.token);
    this.setUser({
      id: res.userId,
      username: res.username,
      email: res.email,
      role: res.role,
      fullName: res.fullName,
    });
    return res;
  },

  async register(data) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(res.token);
    this.setUser({
      id: res.userId,
      username: res.username,
      email: res.email,
      role: res.role,
      fullName: res.fullName,
    });
    return res;
  },

  async getCurrentUser() {
    return await this.request('/auth/me');
  },

  logout() {
    this.setToken(null);
    this.setUser(null);
    window.location.href = 'login.html';
  },

  // --------------------------------------------------------------------------
  // Train Search & Route Endpoints
  // --------------------------------------------------------------------------
  async getStations() {
    return await this.request('/trains/stations');
  },

  async searchTrains(from, to, date) {
    return await this.request(`/trains/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  },

  // --------------------------------------------------------------------------
  // Seat Engine Endpoints (Locking & Auto-Allocation)
  // --------------------------------------------------------------------------
  async getCoaches(trainId) {
    return await this.request(`/seats/coaches/${trainId}`);
  },

  async getCoachLayout(coachId) {
    return await this.request(`/seats/layout/${coachId}`);
  },

  async lockSeat(seatId, durationMinutes = 10) {
    return await this.request('/seats/lock', {
      method: 'POST',
      body: JSON.stringify({ seatId, durationMinutes }),
    });
  },

  async unlockSeat(seatId) {
    return await this.request('/seats/unlock', {
      method: 'POST',
      body: JSON.stringify({ seatId }),
    });
  },

  async autoAllocateSeats(trainId, coachType, passengers, journeyDate) {
    return await this.request('/seats/auto-allocate', {
      method: 'POST',
      body: JSON.stringify({ trainId, coachType, passengers, journeyDate }),
    });
  },

  // --------------------------------------------------------------------------
  // Booking & PNR Endpoints
  // --------------------------------------------------------------------------
  async createBooking(bookingData) {
    return await this.request('/bookings/create', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async getMyBookings() {
    return await this.request('/bookings/my');
  },

  async cancelBooking(pnr, reason) {
    return await this.request(`/bookings/cancel/${pnr}`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  async getPnrStatus(pnr) {
    return await this.request(`/pnr/${pnr}`);
  },

  // --------------------------------------------------------------------------
  // Journey Weather Alert Endpoints
  // --------------------------------------------------------------------------
  async getJourneyWeather(from, to, date) {
    return await this.request(`/weather/journey?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  },

  // --------------------------------------------------------------------------
  // Berth Exchange Endpoints
  // --------------------------------------------------------------------------
  async getEligiblePassengers(trainId, journeyDate, coachType, excludeBookingId) {
    return await this.request(`/berth-exchange/eligible?trainId=${trainId}&journeyDate=${journeyDate}&coachType=${coachType}&excludeBookingId=${excludeBookingId || ''}`);
  },

  async requestBerthExchange(data) {
    return await this.request('/berth-exchange/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async respondBerthExchange(requestId, accept, reason) {
    return await this.request(`/berth-exchange/respond/${requestId}`, {
      method: 'POST',
      body: JSON.stringify({ accept, reason }),
    });
  },

  async getMyExchanges() {
    return await this.request('/berth-exchange/my');
  },

  // --------------------------------------------------------------------------
  // Admin & Ticket Inspection Endpoints
  // --------------------------------------------------------------------------
  async getDashboardStats() {
    return await this.request('/admin/dashboard');
  },

  async getAllTrains() {
    return await this.request('/admin/trains');
  },

  async addTrain(trainData) {
    return await this.request('/admin/trains', {
      method: 'POST',
      body: JSON.stringify(trainData),
    });
  },

  async updateTrain(id, trainData) {
    return await this.request(`/admin/trains/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trainData),
    });
  },

  async removeTrain(id) {
    return await this.request(`/admin/trains/${id}`, {
      method: 'DELETE',
    });
  },

  async getTrainRoutes(trainId) {
    return await this.request(`/admin/trains/${trainId}/routes`);
  },

  async addRouteStop(trainId, routeData) {
    return await this.request(`/admin/trains/${trainId}/routes`, {
      method: 'POST',
      body: JSON.stringify(routeData),
    });
  },

  async removeRouteStop(routeId) {
    return await this.request(`/admin/trains/routes/${routeId}`, {
      method: 'DELETE',
    });
  },

  async getAllFares() {
    return await this.request('/admin/fares');
  },

  async configureFare(fareData) {
    return await this.request('/admin/fares', {
      method: 'POST',
      body: JSON.stringify(fareData),
    });
  },

  async getAllStations() {
    return await this.request('/admin/stations');
  },

  async addStation(stationData) {
    return await this.request('/admin/stations', {
      method: 'POST',
      body: JSON.stringify(stationData),
    });
  },

  async removeStation(stationId) {
    return await this.request(`/admin/stations/${stationId}`, {
      method: 'DELETE',
    });
  },

  async getAuditLogs() {
    return await this.request('/admin/audits');
  },

  async verifyTicket(pnrOrTicketId, comments = '') {
    return await this.request('/tickets/verify', {
      method: 'POST',
      body: JSON.stringify({ pnrOrTicketId, comments }),
    });
  },

  async getQRCode(text, size = 200) {
    return await this.request(`/tickets/qr?text=${encodeURIComponent(text)}&size=${size}`);
  },

  // ==========================================================================
  // AI Multilingual Chatbot & Voice Assistant Client Methods
  // ==========================================================================
  async sendChatMessage(chatData) {
    return await this.request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify(chatData)
    });
  },

  async getChatHistory(sessionId) {
    return await this.request(`/ai/chat/history?sessionId=${encodeURIComponent(sessionId)}`);
  },

  async clearChatHistory(sessionId) {
    return await this.request(`/ai/chat/history?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE'
    });
  },

  async getSupportedLanguages() {
    return await this.request('/ai/supported-languages');
  },

  async detectLanguage(text) {
    return await this.request('/ai/language/detect', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
  },

  async getLanguagePreference() {
    return await this.request('/ai/language/preference');
  },

  async saveLanguagePreference(preferenceData) {
    return await this.request('/ai/language/preference', {
      method: 'POST',
      body: JSON.stringify(preferenceData)
    });
  },

  async transcribeVoice(audioData) {
    return await this.request('/ai/voice/transcribe', {
      method: 'POST',
      body: JSON.stringify(audioData)
    });
  },

  async speakVoice(speakData) {
    return await this.request('/ai/voice/speak', {
      method: 'POST',
      body: JSON.stringify(speakData)
    });
  },

  async processVoice(voiceProcessData) {
    return await this.request('/ai/voice/process', {
      method: 'POST',
      body: JSON.stringify(voiceProcessData)
    });
  },

  async getVoiceHistory(sessionId) {
    return await this.request(`/ai/voice/history?sessionId=${encodeURIComponent(sessionId)}`);
  }
};

window.Api = Api;
