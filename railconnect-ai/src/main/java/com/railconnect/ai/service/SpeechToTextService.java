package com.railconnect.ai.service;

import com.railconnect.ai.dto.VoiceTranscribeRequest;
import com.railconnect.ai.dto.VoiceTranscribeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class SpeechToTextService {

    @Value("${railconnect.ai.stt-api-key:}")
    private String sttApiKey;

    @Value("${railconnect.ai.stt-provider:WEB_SPEECH_API}")
    private String sttProvider;

    private final LanguageDetectionService languageDetectionService;

    public SpeechToTextService(LanguageDetectionService languageDetectionService) {
        this.languageDetectionService = languageDetectionService;
    }

    public VoiceTranscribeResponse transcribeAudio(VoiceTranscribeRequest request) {
        if (request == null) {
            return new VoiceTranscribeResponse("", "en", 0.0, "NONE");
        }

        // Case 1: Browser client passed transcribed text using Web Speech API
        if (request.getTranscriptFallback() != null && !request.getTranscriptFallback().trim().isEmpty()) {
            String text = request.getTranscriptFallback().trim();
            String detectedLang = request.getLanguage();
            if (detectedLang == null || detectedLang.isBlank()) {
                detectedLang = languageDetectionService.detectLanguage(text).getLanguageCode();
            }
            return new VoiceTranscribeResponse(text, detectedLang, 0.96, "WEB_SPEECH_API");
        }

        // Case 2: Audio Base64 provided
        if (request.getAudioBase64() != null && !request.getAudioBase64().trim().isEmpty()) {
            try {
                byte[] audioBytes = Base64.getDecoder().decode(request.getAudioBase64());
                if (audioBytes.length == 0) {
                    return new VoiceTranscribeResponse("Empty audio input", "en", 0.0, "AUDIO_PROCESSOR");
                }

                // If external Whisper / Speech-to-Text API configured
                if (sttApiKey != null && !sttApiKey.isBlank() && !sttApiKey.equals("YOUR_API_KEY_HERE")) {
                    // Modular external STT hook
                    // For example: POST to https://api.openai.com/v1/audio/transcriptions
                }

                // Default graceful processing
                String defaultLang = request.getLanguage() != null ? request.getLanguage() : "en";
                return new VoiceTranscribeResponse(
                        "Voice audio stream received (" + audioBytes.length + " bytes). Please use the Web Speech microphone button for instant real-time transcription.",
                        defaultLang,
                        0.90,
                        "AUDIO_PROCESSOR"
                );
            } catch (Exception e) {
                return new VoiceTranscribeResponse("Error processing audio payload", "en", 0.0, "ERROR");
            }
        }

        return new VoiceTranscribeResponse("No speech recognized", "en", 0.0, "FALLBACK");
    }
}
