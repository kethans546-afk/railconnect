package com.railconnect.ai.service;

import com.railconnect.ai.dto.*;
import com.railconnect.ai.model.AIVoiceHistory;
import com.railconnect.ai.repository.AIVoiceHistoryRepository;
import com.railconnect.auth.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VoiceProcessingService {

    private final SpeechToTextService speechToTextService;
    private final TextToSpeechService textToSpeechService;
    private final ChatbotService chatbotService;
    private final AIVoiceHistoryRepository voiceHistoryRepository;
    private final LanguageDetectionService languageDetectionService;

    public VoiceProcessingService(SpeechToTextService speechToTextService,
                                  TextToSpeechService textToSpeechService,
                                  ChatbotService chatbotService,
                                  AIVoiceHistoryRepository voiceHistoryRepository,
                                  LanguageDetectionService languageDetectionService) {
        this.speechToTextService = speechToTextService;
        this.textToSpeechService = textToSpeechService;
        this.chatbotService = chatbotService;
        this.voiceHistoryRepository = voiceHistoryRepository;
        this.languageDetectionService = languageDetectionService;
    }

    @Transactional
    public ChatResponse processVoiceQuery(VoiceTranscribeRequest voiceRequest, User user) {
        // Step 1: Transcribe audio or take fallback
        VoiceTranscribeResponse transcription = speechToTextService.transcribeAudio(voiceRequest);
        String spokenText = transcription.getRecognizedText();
        String detectedLang = transcription.getDetectedLanguage();

        if (detectedLang == null || detectedLang.isBlank()) {
            detectedLang = languageDetectionService.detectLanguage(spokenText).getLanguageCode();
        }

        // Step 2: Query Chatbot for intelligent railway response
        ChatRequest chatRequest = new ChatRequest(spokenText, voiceRequest.getSessionId(), detectedLang);
        chatRequest.setVoiceInput(true);

        ChatResponse chatResponse = chatbotService.processChat(chatRequest, user);

        // Step 3: Synthesize voice response
        VoiceSpeakRequest speakRequest = new VoiceSpeakRequest(chatResponse.getResponse(), chatResponse.getLanguage());
        VoiceSpeakResponse speakResponse = textToSpeechService.synthesizeSpeech(speakRequest);

        chatResponse.setAudioBase64(speakResponse.getAudioBase64());
        chatResponse.setAudioFormat(speakResponse.getAudioFormat());

        // Step 4: Persist in AI_VOICE_HISTORY
        String sessId = voiceRequest.getSessionId() != null ? voiceRequest.getSessionId() : "voice-session-default";
        AIVoiceHistory vh = new AIVoiceHistory(user, sessId, spokenText, chatResponse.getResponse(), chatResponse.getLanguage());
        voiceHistoryRepository.save(vh);

        return chatResponse;
    }
}
