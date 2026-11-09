/**
 * RAILCONNECT — AI Multilingual Chatbot & Voice Assistant Engine
 * 
 * Capabilities:
 * - 8 Indian Languages: English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi
 * - Automated Language Detection (Unicode script & vocabulary analysis)
 * - Two-Way Voice: Web Speech Recognition (STT) + Web Speech Synthesis / PCM WAV (TTS)
 * - Intelligent Query Routing: Train search, PNR enquiry, seat availability, weather alerts, berth exchange
 * - Session Persistence & History Synchronization with Spring Boot Backend (/api/ai/*)
 */

(function () {
  'use strict';

  const LANGUAGES = {
    en: { name: 'English', native: 'English', bcp47: 'en-IN', placeholder: 'Ask about trains, PNR, seats, weather...', welcome: 'Hello! Welcome to RailConnect AI Assistant. I can help you search trains, check bookings, live PNR, seat availability, and weather. How may I assist you today?' },
    hi: { name: 'Hindi', native: 'हिन्दी', bcp47: 'hi-IN', placeholder: 'ट्रेन, पीएनआर, सीट या मौसम के बारे में पूछें...', welcome: 'नमस्ते! रेलकनेक्ट एआई सहायक में आपका स्वागत है। मैं ट्रेन खोजने, पीएनआर स्थिति, सीट उपलब्धता एवं मौसम अलर्ट में आपकी सहायता कर सकता हूँ। आप क्या जानना चाहते हैं?' },
    te: { name: 'Telugu', native: 'తెలుగు', bcp47: 'te-IN', placeholder: 'రైళ్లు, పిఎన్‌ఆర్, సీట్లు, వాతావరణం గురించి అడగండి...', welcome: 'నమస్కారం! రైల్‌కనెక్ట్ AI అసిస్టెంట్‌కి స్వాగతం. రైలు శోధన, లైవ్ పిఎన్‌ఆర్, సీట్ల లభ్యత మరియు ప్రయాణ వాతావరణ సమాచారంలో నేను మీకు సహాయపడగలను. మీకు ఏమి కావాలి?' },
    ta: { name: 'Tamil', native: 'தமிழ்', bcp47: 'ta-IN', placeholder: 'ரயில்கள், பிஎன்ஆர், இருக்கை, வானிலை பற்றி கேட்கவும்...', welcome: 'வணக்கம்! ரயில் கனெக்ட் AI உதவியாளருக்கு வரவேற்கிறோம். ரயில் தேடல், நேரலை பிஎன்ஆர், இருக்கை இருப்பு மற்றும் பயண வானிலை குறித்து நான் உங்களுக்கு உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவட்டும்?' },
    kn: { name: 'Kannada', native: 'ಕನ್ನಡ', bcp47: 'kn-IN', placeholder: 'ರೈಲುಗಳು, ಪಿಎನ್‌ಆರ್, ಸೀಟುಗಳು, ಹವಾಮಾನ ಬಗ್ಗೆ ಕೇಳಿ...', welcome: 'ನಮಸ್ಕಾರ! ರೈಲ್‌ಕನೆಕ್ಟ್ AI ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ರೈಲು ಹುಡುಕಾಟ, ಪಿಎನ್‌ಆರ್ ಸ್ಥಿತಿ, ಸೀಟುಗಳ ಲಭ್ಯತೆ ಮತ್ತು ಹವಾಮಾನ ಮಾಹಿತಿಯಲ್ಲಿ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?' },
    ml: { name: 'Malayalam', native: 'മലയാളം', bcp47: 'ml-IN', placeholder: 'ട്രെയിനുകൾ, പിഎൻആർ, സീറ്റ് ലഭ്യത ചോദിക്കൂ...', welcome: 'നമസ്കാരം! റെയിൽകണക്റ്റ് AI അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം. ട്രെയിൻ തിരയൽ, തത്സമയ പിഎൻആർ, സീറ്റ് ലഭ്യത, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ എന്നിവയിൽ ഞാൻ സഹായിക്കാം. എന്ത് വിവരമാണ് അറിയേണ്ടത്?' },
    bn: { name: 'Bengali', native: 'বাংলা', bcp47: 'bn-IN', placeholder: 'ট্রেন, পিএনআর, সিট, আবহাওয়া সম্পর্কে জিজ্ঞাসা করুন...', welcome: 'নমস্কার! রেলকানেক্ট এআই সহায়কে স্বাগতম। ট্রেন অনুসন্ধান, লাইভ পিএনআর, সিট প্রাপ্যতা ও আবহাওয়া সতর্কতায় আমি আপনাকে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?' },
    mr: { name: 'Marathi', native: 'मराठी', bcp47: 'mr-IN', placeholder: 'गाड्या, पीएनआर, जागा किंवा हवामानाबद्दल विचारा...', welcome: 'नमस्कार! रेलकनेक्ट एआई सहाय्यकामध्ये आपले स्वागत आहे. गाडी शोधणे, थेट पीएनआर स्थिती, जागांची उपलब्धता आणि हवामान माहिती मिळवण्यात मी आपल्याला मदत करू शकतो.' }
  };

  const SUGGESTIONS = {
    en: ['Search trains Chennai to Trichy', 'Check PNR Status', 'Route Weather Advisory', 'Tatkal Booking Rules', 'Berth Exchange Guide'],
    hi: ['चेन्नई से तिरुचि ट्रेन खोजें', 'पीएनआर स्थिति जांचें', 'मौसम अलर्ट देखें', 'तत्काल बुकिंग नियम', 'बर्थ एक्सचेंज गाइड'],
    te: ['చెన్నై నుంచి తిరుచ్చి రైళ్లు', 'పిఎన్‌ఆర్ స్టేటస్', 'వాతావరణ హెచ్చరికలు', 'తత్కాల్ బుకింగ్ నిబంధనలు', 'బర్త్ ఎక్స్‌చేంజ్ విధానం'],
    ta: ['சென்னை முதல் திருச்சி ரயில்கள்', 'பிஎன்ஆர் நிலை', 'வானிலை தகவல்', 'தட்கல் விதிகள்', 'பர்த் எக்ஸ்சேஞ்ச் உதவி'],
    kn: ['ಬೆಂಗಳೂರು ರೈಲುಗಳನ್ನು ಹುಡುಕಿ', 'ಪಿಎನ್‌ಆರ್ ಸ್ಥಿತಿ', 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ', 'ತತ್ಕಾಲ್ ನಿಯಮಗಳು', 'ಬರ್ತ್ ವಿನಿಮಯ'],
    ml: ['ട്രെയിനുകൾ തിരയുക', 'പിഎൻആർ പരിശോധിക്കുക', 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്', 'തത്കാൽ നിയമങ്ങൾ', 'ബർത്ത് എക്സ്ചേഞ്ച്'],
    bn: ['ট্রেন অনুসন্ধান করুন', 'পিএনআর স্ট্যাটাস', 'আবহাওয়া সতর্কতা', 'তৎকাল বুকিং নিয়ম', 'বার্থ এক্সচেঞ্জ'],
    mr: ['गाड्या शोधा', 'पीएनआर स्थिती', 'हवामान अंदाज', 'तत्काळ बुकिंग नियम', 'बर्थ अदलाबदल']
  };

  class RailConnectAIEngine {
    constructor() {
      this.currentLang = localStorage.getItem('railconnect_lang') || 'en';
      if (!LANGUAGES[this.currentLang]) this.currentLang = 'en';

      this.sessionId = sessionStorage.getItem('rc_ai_session_id');
      if (!this.sessionId) {
        this.sessionId = 'rc-sess-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);
        sessionStorage.setItem('rc_ai_session_id', this.sessionId);
      }

      this.isOpen = false;
      this.isVoiceModalOpen = false;
      this.isListening = false;
      this.recognition = null;
      this.lastSpokenText = '';
      this.audioPlayer = null;

      this.initSpeechRecognition();
    }

    initSpeechRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
          this.isListening = true;
          this.updateVoiceUIState(true);
        };

        this.recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          this.updateTranscriptDisplay(currentText);

          if (finalTranscript) {
            this.handleVoiceRecognized(finalTranscript);
          }
        };

        this.recognition.onerror = (event) => {
          console.warn('[RailConnect AI Speech Error]:', event.error);
          this.isListening = false;
          this.updateVoiceUIState(false);
          if (event.error === 'not-allowed') {
            this.updateTranscriptDisplay('⚠️ Microphone permission was denied. Please allow microphone access in your browser settings.');
          } else {
            this.updateTranscriptDisplay(`Speech error: ${event.error}. Please try again.`);
          }
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.updateVoiceUIState(false);
        };
      }
    }

    injectDOM() {
      if (document.getElementById('rc-ai-root')) return;

      const root = document.createElement('div');
      root.id = 'rc-ai-root';

      // 1. Floating Launcher Button
      const launcher = document.createElement('button');
      launcher.className = 'rc-ai-launcher';
      launcher.id = 'rcAiLauncher';
      launcher.title = 'RailConnect AI Multilingual Assistant';
      launcher.innerHTML = `
        <div class="rc-ai-pulse-ring"></div>
        <span class="rc-ai-badge">AI</span>
        <span>🤖</span>
      `;
      launcher.onclick = () => this.toggleChat();

      // 2. Chat Drawer Window
      const drawer = document.createElement('div');
      drawer.className = 'rc-ai-chat-window';
      drawer.id = 'rcAiDrawer';
      drawer.innerHTML = `
        <div class="rc-ai-header">
          <div class="rc-ai-header-left">
            <div class="rc-ai-avatar">
              🤖
              <div class="rc-ai-online-dot"></div>
            </div>
            <div class="rc-ai-title-block">
              <h4>RailConnect AI</h4>
              <div class="rc-ai-status-pill">
                <span>●</span> Autonomous Domain AI
              </div>
            </div>
          </div>
          <div class="rc-ai-header-actions">
            <select class="rc-ai-lang-select" id="rcAiLangSelect">
              ${Object.keys(LANGUAGES).map(code => `
                <option value="${code}" ${code === this.currentLang ? 'selected' : ''}>
                  ${LANGUAGES[code].native}
                </option>
              `).join('')}
            </select>
            <button class="rc-ai-btn-icon" id="rcAiBtnVoiceDirect" title="Launch Voice Assistant">🎙️</button>
            <button class="rc-ai-btn-icon" id="rcAiBtnClear" title="Clear Chat History">🗑️</button>
            <button class="rc-ai-btn-icon" id="rcAiBtnClose" title="Minimize Chat">✕</button>
          </div>
        </div>

        <div class="rc-ai-feed" id="rcAiFeed">
          <!-- Messages will be injected here -->
        </div>

        <div class="rc-ai-suggestions" id="rcAiSuggestions">
          <!-- Suggestion chips injected dynamically -->
        </div>

        <div class="rc-ai-footer">
          <input type="text" class="rc-ai-input" id="rcAiInput" placeholder="${LANGUAGES[this.currentLang].placeholder}">
          <button class="rc-ai-btn-mic" id="rcAiBtnMic" title="Speak Query">🎤</button>
          <button class="rc-ai-btn-send" id="rcAiBtnSend" title="Send Query">➔</button>
        </div>
      `;

      // 3. Voice Assistant Fullscreen Modal
      const voiceOverlay = document.createElement('div');
      voiceOverlay.className = 'rc-voice-overlay';
      voiceOverlay.id = 'rcVoiceOverlay';
      voiceOverlay.innerHTML = `
        <div class="rc-voice-modal">
          <button class="rc-voice-close" id="rcVoiceClose">✕</button>
          <div class="rc-voice-lang-badge" id="rcVoiceLangBadge">
            Language: ${LANGUAGES[this.currentLang].name} (${LANGUAGES[this.currentLang].native})
          </div>

          <div class="rc-voice-orb-container">
            <div class="rc-voice-orb" id="rcVoiceOrb">
              🎙️
            </div>
          </div>

          <div class="rc-voice-bars" id="rcVoiceBars">
            <div class="rc-voice-bar"></div>
            <div class="rc-voice-bar"></div>
            <div class="rc-voice-bar"></div>
            <div class="rc-voice-bar"></div>
            <div class="rc-voice-bar"></div>
            <div class="rc-voice-bar"></div>
            <div class="rc-voice-bar"></div>
          </div>

          <div class="rc-voice-status-text" id="rcVoiceStatusText">
            Tap microphone and start speaking
          </div>

          <div class="rc-voice-transcript" id="rcVoiceTranscript">
            "Say 'Search trains to Trichy' or 'చెన్నై నుంచి తిరుచ్చికి రైళ్లు చూపించు'"
          </div>

          <div class="rc-voice-actions">
            <button class="rc-voice-btn-sec" id="rcVoiceStopSpeakingBtn" style="display:none;">
              ⏹️ Stop Audio
            </button>
            <button class="rc-voice-btn-sec" id="rcVoiceReplayBtn" style="display:none;">
              🔊 Replay Audio
            </button>
            <button class="rc-voice-btn-pri" id="rcVoiceActionBtn">
              🎤 Start Listening
            </button>
          </div>
        </div>
      `;

      root.appendChild(launcher);
      root.appendChild(drawer);
      root.appendChild(voiceOverlay);
      document.body.appendChild(root);

      this.bindEvents();
      this.renderInitialWelcome();
      this.renderSuggestions();
    }

    bindEvents() {
      // Chat Drawer Controls
      document.getElementById('rcAiBtnClose').onclick = () => this.closeChat();
      document.getElementById('rcAiBtnClear').onclick = () => this.clearHistory();
      document.getElementById('rcAiBtnVoiceDirect').onclick = () => this.openVoiceModal();

      // Language Select
      document.getElementById('rcAiLangSelect').onchange = (e) => {
        this.setLanguage(e.target.value);
      };

      // Input Send
      const input = document.getElementById('rcAiInput');
      const sendBtn = document.getElementById('rcAiBtnSend');
      const micBtn = document.getElementById('rcAiBtnMic');

      const submitQuery = () => {
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.sendUserMessage(text);
      };

      sendBtn.onclick = submitQuery;
      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitQuery();
        }
      };

      micBtn.onclick = () => {
        this.toggleVoiceInputInline();
      };

      // Voice Modal Controls
      document.getElementById('rcVoiceClose').onclick = () => this.closeVoiceModal();
      document.getElementById('rcVoiceActionBtn').onclick = () => this.toggleVoiceListening();
      document.getElementById('rcVoiceOrb').onclick = () => this.toggleVoiceListening();
      document.getElementById('rcVoiceStopSpeakingBtn').onclick = () => this.stopSpeaking();
      document.getElementById('rcVoiceReplayBtn').onclick = () => this.replaySpeaking();
    }

    toggleChat() {
      this.isOpen ? this.closeChat() : this.openChat();
    }

    openChat() {
      this.isOpen = true;
      document.getElementById('rcAiDrawer').classList.add('open');
      document.getElementById('rcAiInput').focus();
    }

    closeChat() {
      this.isOpen = false;
      document.getElementById('rcAiDrawer').classList.remove('open');
      this.stopSpeaking();
    }

    openVoiceModal() {
      this.isVoiceModalOpen = true;
      document.getElementById('rcVoiceOverlay').classList.add('open');
      this.updateVoiceModalLangBadge();
      // Start listening automatically
      this.startListening();
    }

    closeVoiceModal() {
      this.isVoiceModalOpen = false;
      document.getElementById('rcVoiceOverlay').classList.remove('open');
      this.stopListening();
      this.stopSpeaking();
    }

    setLanguage(lang) {
      if (!LANGUAGES[lang]) return;
      this.currentLang = lang;
      localStorage.setItem('railconnect_lang', lang);

      // Sync select
      const select = document.getElementById('rcAiLangSelect');
      if (select) select.value = lang;

      // Sync input placeholder
      const input = document.getElementById('rcAiInput');
      if (input) input.placeholder = LANGUAGES[lang].placeholder;

      this.updateVoiceModalLangBadge();
      this.renderSuggestions();

      // Notify global I18n if loaded
      if (window.I18n && typeof window.I18n.setLanguage === 'function') {
        window.I18n.setLanguage(lang);
      }

      // Persist preference to backend if Api is available
      if (window.Api && typeof window.Api.saveLanguagePreference === 'function') {
        window.Api.saveLanguagePreference({ preferredLanguage: lang, voiceEnabled: true }).catch(() => {});
      }
    }

    updateVoiceModalLangBadge() {
      const badge = document.getElementById('rcVoiceLangBadge');
      if (badge && LANGUAGES[this.currentLang]) {
        badge.textContent = `Language: ${LANGUAGES[this.currentLang].name} (${LANGUAGES[this.currentLang].native})`;
      }
    }

    renderInitialWelcome() {
      const feed = document.getElementById('rcAiFeed');
      if (!feed) return;
      feed.innerHTML = '';
      this.appendAIMessage(LANGUAGES[this.currentLang].welcome);
    }

    renderSuggestions() {
      const container = document.getElementById('rcAiSuggestions');
      if (!container) return;
      const chips = SUGGESTIONS[this.currentLang] || SUGGESTIONS.en;

      container.innerHTML = chips.map(chip => `
        <button class="rc-ai-chip" onclick="window.RailConnectAI.sendQuery('${chip.replace(/'/g, "\\'")}')">
          ${chip}
        </button>
      `).join('');
    }

    appendUserMessage(text) {
      const feed = document.getElementById('rcAiFeed');
      if (!feed) return;

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msg = document.createElement('div');
      msg.className = 'rc-ai-msg rc-ai-msg-user';
      msg.innerHTML = `
        <div class="rc-ai-bubble">${this.escapeHTML(text)}</div>
        <div class="rc-ai-msg-time">${time}</div>
      `;
      feed.appendChild(msg);
      feed.scrollTop = feed.scrollHeight;
    }

    appendAIMessage(reply, trains = [], executionMode = 'AUTONOMOUS_DOMAIN_AI') {
      const feed = document.getElementById('rcAiFeed');
      if (!feed) return;

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msg = document.createElement('div');
      msg.className = 'rc-ai-msg rc-ai-msg-ai';

      let trainCardsHtml = '';
      if (trains && trains.length > 0) {
        trainCardsHtml = trains.map(t => `
          <div class="rc-ai-train-card">
            <div class="rc-ai-train-header">
              <span>${t.trainNumber} - ${t.trainName}</span>
              <span style="color:#10b981;">₹${t.fare}</span>
            </div>
            <div class="rc-ai-train-timings">
              Depart: ${t.departureTime || '--'} | Duration: ${t.durationHours || t.duration || '--'} | Available: ${t.availableSeats || 'Yes'}
            </div>
            <a href="search-trains.html" class="rc-ai-train-action">Book Now ➔</a>
          </div>
        `).join('');
      }

      const formattedReply = this.formatMessageText(reply);

      msg.innerHTML = `
        <div class="rc-ai-bubble">
          ${formattedReply}
          ${trainCardsHtml}
        </div>
        <div class="rc-ai-msg-time">${time} • ${executionMode === 'EXTERNAL_LLM_CONNECTED' ? 'Live LLM' : 'RailConnect Assistant'}</div>
      `;
      feed.appendChild(msg);
      feed.scrollTop = feed.scrollHeight;
    }

    showTypingIndicator() {
      const feed = document.getElementById('rcAiFeed');
      if (!feed || document.getElementById('rcAiTyping')) return;

      const typing = document.createElement('div');
      typing.id = 'rcAiTyping';
      typing.className = 'rc-ai-typing';
      typing.innerHTML = `
        <div class="rc-ai-typing-dot"></div>
        <div class="rc-ai-typing-dot"></div>
        <div class="rc-ai-typing-dot"></div>
      `;
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }

    hideTypingIndicator() {
      const typing = document.getElementById('rcAiTyping');
      if (typing) typing.remove();
    }

    async sendUserMessage(text) {
      this.appendUserMessage(text);
      this.showTypingIndicator();

      // Check language detection client-side to adapt dropdown if needed
      this.autoDetectScript(text);

      try {
        const user = window.Api ? window.Api.getUser() : null;
        let response = null;

        if (window.Api && typeof window.Api.sendChatMessage === 'function') {
          response = await window.Api.sendChatMessage({
            message: text,
            language: this.currentLang,
            sessionId: this.sessionId,
            userId: user ? user.id : null
          });
        }

        this.hideTypingIndicator();

        if (response && response.reply) {
          if (response.language && response.language !== this.currentLang && LANGUAGES[response.language]) {
            this.setLanguage(response.language);
          }
          this.appendAIMessage(response.reply, response.trains, response.executionMode);
          this.lastSpokenText = response.reply;
        } else {
          this.appendAIMessage("I've received your query. Please check your train route or provide your 10-digit PNR for instant assistance.");
        }
      } catch (err) {
        console.warn('[RailConnect AI Error]:', err);
        this.hideTypingIndicator();
        this.appendAIMessage("I am currently operating in resilient offline mode. You can search trains, check PNR, or view weather advisories anytime.");
      }
    }

    autoDetectScript(text) {
      if (/[\u0C00-\u0C7F]/.test(text) && this.currentLang !== 'te') this.setLanguage('te');
      else if (/[\u0B80-\u0BFF]/.test(text) && this.currentLang !== 'ta') this.setLanguage('ta');
      else if (/[\u0C80-\u0CFF]/.test(text) && this.currentLang !== 'kn') this.setLanguage('kn');
      else if (/[\u0D00-\u0D7F]/.test(text) && this.currentLang !== 'ml') this.setLanguage('ml');
      else if (/[\u0980-\u09FF]/.test(text) && this.currentLang !== 'bn') this.setLanguage('bn');
      else if (/[\u0900-\u097F]/.test(text) && this.currentLang !== 'hi' && this.currentLang !== 'mr') this.setLanguage('hi');
    }

    // ========================================================================
    // Voice Assistant Execution
    // ========================================================================
    toggleVoiceInputInline() {
      if (this.isListening) {
        this.stopListening();
      } else {
        this.openChat();
        this.startListening();
      }
    }

    toggleVoiceListening() {
      if (this.isListening) {
        this.stopListening();
      } else {
        this.startListening();
      }
    }

    startListening() {
      if (!this.recognition) {
        alert('Voice input is not supported by your current browser. Please try Google Chrome, Microsoft Edge, or Safari.');
        return;
      }

      try {
        const langConfig = LANGUAGES[this.currentLang] || LANGUAGES.en;
        this.recognition.lang = langConfig.bcp47;
        this.recognition.start();
      } catch (e) {
        // Recognition might already be running
        console.log('[SpeechRecognition start note]:', e);
      }
    }

    stopListening() {
      if (this.recognition && this.isListening) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }
      this.isListening = false;
      this.updateVoiceUIState(false);
    }

    updateVoiceUIState(listening) {
      // Inline mic button
      const micBtn = document.getElementById('rcAiBtnMic');
      if (micBtn) {
        if (listening) micBtn.classList.add('listening');
        else micBtn.classList.remove('listening');
      }

      // Voice Modal Orb & Bars
      const orb = document.getElementById('rcVoiceOrb');
      const bars = document.getElementById('rcVoiceBars');
      const statusText = document.getElementById('rcVoiceStatusText');
      const actionBtn = document.getElementById('rcVoiceActionBtn');

      if (orb && bars && statusText && actionBtn) {
        if (listening) {
          orb.classList.add('listening');
          bars.classList.add('active');
          statusText.textContent = `Listening in ${LANGUAGES[this.currentLang].name}... Speak now!`;
          actionBtn.textContent = '⏹️ Stop Listening';
          actionBtn.style.background = '#ef4444';
        } else {
          orb.classList.remove('listening');
          bars.classList.remove('active');
          statusText.textContent = 'Tap microphone to speak';
          actionBtn.textContent = '🎤 Start Listening';
          actionBtn.style.background = '#1e3a8a';
        }
      }
    }

    updateTranscriptDisplay(text) {
      // Voice Modal transcript
      const transcriptEl = document.getElementById('rcVoiceTranscript');
      if (transcriptEl) {
        transcriptEl.textContent = `"${text}"`;
      }
      // Inline input placeholder or value
      const input = document.getElementById('rcAiInput');
      if (input && this.isListening) {
        input.value = text;
      }
    }

    async handleVoiceRecognized(finalText) {
      this.stopListening();
      this.updateVoiceUIState(false);

      const statusText = document.getElementById('rcVoiceStatusText');
      if (statusText) statusText.textContent = 'Processing your speech with RailConnect AI...';

      // Auto detect language from speech
      this.autoDetectScript(finalText);

      // Send to backend voice endpoint
      try {
        const user = window.Api ? window.Api.getUser() : null;
        let result = null;

        if (window.Api && typeof window.Api.processVoice === 'function') {
          result = await window.Api.processVoice({
            recognizedText: finalText,
            language: this.currentLang,
            sessionId: this.sessionId,
            userId: user ? user.id : null
          });
        }

        const reply = (result && result.reply) ? result.reply : "Here are the matching trains and journey updates for your query.";
        this.lastSpokenText = reply;

        if (statusText) statusText.textContent = 'Speaking response...';

        // Update chat window feed as well
        this.appendUserMessage(finalText);
        this.appendAIMessage(reply, result ? result.trains : [], result ? result.executionMode : 'AUTONOMOUS_DOMAIN_AI');

        // Play audio TTS
        this.speakResponse(reply, result && result.audioBase64 ? result.audioBase64 : null);
      } catch (e) {
        console.warn('[Voice Process Error]:', e);
        const fallbackReply = "I received your voice instruction. Displaying train details and booking options on screen.";
        this.speakResponse(fallbackReply);
      }
    }

    speakResponse(text, audioBase64 = null) {
      this.stopSpeaking();

      // Show Stop and Replay controls in Voice Modal
      const stopBtn = document.getElementById('rcVoiceStopSpeakingBtn');
      const replayBtn = document.getElementById('rcVoiceReplayBtn');
      if (stopBtn) stopBtn.style.display = 'inline-flex';
      if (replayBtn) replayBtn.style.display = 'inline-flex';

      // If backend returned synthesized PCM WAV base64
      if (audioBase64) {
        try {
          const audio = new Audio("data:audio/wav;base64," + audioBase64);
          this.audioPlayer = audio;
          audio.onended = () => {
            const statusText = document.getElementById('rcVoiceStatusText');
            if (statusText) statusText.textContent = 'Finished speaking. Tap microphone to ask more.';
          };
          audio.play();
          return;
        } catch (err) {
          console.warn('[Audio Playback Fallback]:', err);
        }
      }

      // Web Speech Synthesis
      if ('speechSynthesis' in window) {
        // Clean markdown characters before speaking
        const cleanText = text.replace(/[*_#`~➔•]/g, ' ').replace(/\n+/g, '. ');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const langConfig = LANGUAGES[this.currentLang] || LANGUAGES.en;
        utterance.lang = langConfig.bcp47;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          const statusText = document.getElementById('rcVoiceStatusText');
          if (statusText) statusText.textContent = 'Finished speaking. Tap microphone to ask more.';
        };

        utterance.onerror = () => {
          const statusText = document.getElementById('rcVoiceStatusText');
          if (statusText) statusText.textContent = 'Response ready. Tap microphone to ask more.';
        };

        window.speechSynthesis.speak(utterance);
      }
    }

    stopSpeaking() {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlayer = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      const stopBtn = document.getElementById('rcVoiceStopSpeakingBtn');
      if (stopBtn) stopBtn.style.display = 'none';
      const statusText = document.getElementById('rcVoiceStatusText');
      if (statusText) statusText.textContent = 'Audio stopped. Tap microphone to speak again.';
    }

    replaySpeaking() {
      if (this.lastSpokenText) {
        this.speakResponse(this.lastSpokenText);
      }
    }

    clearHistory() {
      if (confirm('Are you sure you want to clear your current conversation?')) {
        this.renderInitialWelcome();
        if (window.Api && typeof window.Api.clearChatHistory === 'function') {
          window.Api.clearChatHistory(this.sessionId).catch(() => {});
        }
      }
    }

    escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    formatMessageText(text) {
      if (!text) return '';
      let escaped = this.escapeHTML(text);
      // Format bold text
      escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Format line breaks
      escaped = escaped.replace(/\n/g, '<br>');
      return escaped;
    }
  }

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.RailConnectAI = new RailConnectAIEngine();
    window.RailConnectAI.injectDOM();
  });

})();
