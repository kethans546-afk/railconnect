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
      const msg = (body.message || '').toLowerCase();
      const lang = body.language || 'en';
      let reply = '';
      let intent = 'GENERAL_QUERY';
      let trainCards = [];

      if (msg.includes('train') || msg.includes('search') || msg.includes('ರೈಲು') || msg.includes('ரயில்') || msg.includes('రైలు') || msg.includes('ट्रेन')) {
        intent = 'TRAIN_SEARCH';
        trainCards = [
          { trainNumber: '20608', trainName: 'Vande Bharat Express', departureTime: '06:00', arrivalTime: '10:40', durationHours: '4h 40m', availableSeats: 48, fare: 950 },
          { trainNumber: '12008', trainName: 'Shatabdi Express', departureTime: '15:15', arrivalTime: '20:10', durationHours: '4h 55m', availableSeats: 32, fare: 870 }
        ];
        if (lang === 'te') reply = 'మీ కోసం 2 ప్రీమియం రైళ్లు అందుబాటులో ఉన్నాయి:\n1. 20608 వందే భారత్ ఎక్స్‌ప్రెస్ (ఉదయం 06:00, 48 సీట్లు లభ్యం)\n2. 12008 శతాబ్ది ఎక్స్‌ప్రెస్ (మధ్యాహ్నం 15:15, 32 సీట్లు లభ్యం)';
        else if (lang === 'hi') reply = 'आपके लिए 2 प्रीमियम ट्रेनें उपलब्ध हैं:\n1. 20608 वंदे भारत एक्सप्रेस (06:00, 48 सीटें उपलब्ध)\n2. 12008 शताब्दी एक्सप्रेस (15:15, 32 सीटें उपलब्ध)';
        else if (lang === 'ta') reply = 'உங்களுக்காக 2 விரைவு ரயில்கள் கிடைக்கின்றன:\n1. 20608 வந்தே பாரத் எக்ஸ்பிரஸ் (காலை 06:00, 48 இருக்கைகள்)\n2. 12008 சதாப்தி எக்ஸ்பிரஸ் (மாலை 15:15, 32 இருக்கைகள்)';
        else if (lang === 'kn') reply = 'ನಿಮಗಾಗಿ 2 ಪ್ರೀಮಿಯಂ ರೈಲುಗಳು ಲಭ್ಯವಿವೆ:\n1. 20608 ವಂದೇ ಭಾರತ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಬೆಳಿಗ್ಗೆ 06:00, 48 ಸೀಟುಗಳು ಲಭ್ಯ)\n2. 12008 ಶತಾಬ್ದಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಮಧ್ಯಾಹ್ನ 15:15, 32 ಸೀಟುಗಳು ಲಭ್ಯ)';
        else reply = 'Found 2 premium express trains for your corridor:\n1. 20608 Vande Bharat Express (Departs 06:00, 48 Seats Available)\n2. 12008 Shatabdi Express (Departs 15:15, 32 Seats Available)';
      } else if (msg.includes('pnr') || msg.includes('status')) {
        intent = 'PNR_STATUS';
        reply = lang === 'te' ? 'పిఎన్‌ఆర్ విచారణ: మీ 10 అంకెల పిఎన్‌ఆర్ నంబర్‌ను పంపండి, మీ బుకింగ్ మరియు సీటు వివరాలను నేను తక్షణమే తనిఖీ చేస్తాను.' :
                lang === 'hi' ? 'पीएनआर स्थिति: कृपया अपना 10 अंकों का पीएनआर नंबर दर्ज करें। मैं तुरंत आपकी सीट और कोच स्थिति दिखाऊंगा।' :
                'PNR Status: Please provide your 10-digit PNR number to check live confirmation, coach, and berth allocation.';
      } else if (msg.includes('weather') || msg.includes('rain') || msg.includes('వాతావరణ') || msg.includes('मौसम') || msg.includes('வானிலை')) {
        intent = 'WEATHER_ALERT';
        reply = lang === 'te' ? 'ప్రయాణ మార్గ వాతావరణం: తిరుచ్చిలో 32°C సాధారణం, చెన్నైలో వర్షం సూచన (80% వర్షపాతం, 29°C). ప్రయాణానికి గొడుగు సిద్ధం చేసుకోండి.' :
                lang === 'hi' ? 'मार्ग मौसम चेतावनी: तिरुचि में 32°C सामान्य है, चेन्नई में भारी बारिश का अलर्ट (80% वर्षा, 29°C) है। कृपया सावधानी बरतें।' :
                'Route Weather Advisory: Trichy (32°C Clear) ➔ Chennai Central (29°C Rain Warning, 80% precipitation). Have a safe journey!';
      } else if (msg.includes('berth') || msg.includes('exchange') || msg.includes('swap') || msg.includes('बर्थ') || msg.includes('బర్త్')) {
        intent = 'BERTH_EXCHANGE';
        reply = lang === 'te' ? 'బర్త్ ఎక్స్‌చేంజ్: రైల్‌కనెక్ట్ P2P వ్యవస్థ ద్వారా మీ రైలులోని ఇతర ప్రయాణికులతో మీ లోయర్/అప్పర్ బర్త్‌ను పరస్పర సమ్మతితో మార్చుకోవచ్చు.' :
                'RailConnect P2P Berth Exchange lets confirmed passengers propose and accept seat swaps within the same coach.';
      } else {
        reply = lang === 'te' ? 'నమస్కారం! నేను రైల్‌కనెక్ట్ AI అసిస్టెంట్. రైలు శోధన, పిఎన్‌ఆర్, సీట్ల లభ్యత మరియు వాతావరణం గురించి సహాయం చేయగలను.' :
                lang === 'hi' ? 'नमस्ते! मैं रेलकनेक्ट एआई सहायक हूँ। ट्रेन खोज, पीएनआर स्थिति, सीट उपलब्धता एवं मौसम अलर्ट के लिए पूछें।' :
                lang === 'ta' ? 'வணக்கம்! நான் ரயில் கனெக்ட் AI உதவியாளர். ரயில் தேடல், பிஎன்ஆர், மற்றும் இருக்கை விவரங்களுக்கு கேளுங்கள்.' :
                lang === 'kn' ? 'ನಮಸ್ಕಾರ! ನಾನು ರೈಲ್‌ಕನೆಕ್ಟ್ AI ಸಹಾಯಕ. ರೈಲು ಹುಡುಕಾಟ, ಪಿಎನ್‌ಆರ್ ಮತ್ತು ಹವಾಮಾನಕ್ಕಾಗಿ ಕೇಳಿ.' :
                lang === 'ml' ? 'നമസ്കാരം! ഞാൻ റെയിൽകണക്റ്റ് AI അസിസ്റ്റന്റാണ്. ട്രെയിൻ തിരയൽ, പിഎൻആർ, സീറ്റ് ലഭ്യത എന്നിവയ്ക്ക് എന്നോട് ചോദിക്കാം.' :
                lang === 'bn' ? 'নমস্কার! আমি রেলকানেক্ট এআই সহায়ক। ট্রেন অনুসন্ধান, পিএনআর স্থিতি ও আবহাওয়া সতর্কতার জন্য আমাকে জিজ্ঞাসা করুন।' :
                lang === 'mr' ? 'नमस्कार! मी रेलकनेक्ट एआय सहाय्यक आहे. गाडी शोधणे, पीएनआर स्थिती आणि हवामानासाठी मला विचारा.' :
                'Hello! Welcome to RailConnect AI Assistant. I can help you search trains, check bookings, live PNR, seat availability, weather advisories, and booking rules.';
      }

      return {
        reply,
        language: lang,
        intent,
        trains: trainCards,
        executionMode: 'AUTONOMOUS_DOMAIN_AI',
        suggestedNextQueries: ['Search trains Chennai to Trichy', 'PNR Status 8492019482', 'Route Weather Advisory', 'Tatkal Booking Rules']
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
