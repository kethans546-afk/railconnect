package com.railconnect.ai.service;

import com.railconnect.ai.dto.ChatRequest;
import com.railconnect.ai.dto.ChatResponse;
import com.railconnect.ai.dto.LanguageDetectResponse;
import com.railconnect.ai.dto.LanguagePreferenceResponse;
import com.railconnect.auth.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

@Service
public class ChatbotService {

    private final LanguageDetectionService languageDetectionService;
    private final AIResponseService aiResponseService;
    private final ChatHistoryService chatHistoryService;

    // Protection against prompt injection and malicious commands
    private static final Pattern PROMPT_INJECTION_PATTERN = Pattern.compile(
            "(?i)(ignore (all )?previous instructions|system prompt|drop table|reveal (password|secret|key)|bypass security|sudo rm)"
    );

    public ChatbotService(LanguageDetectionService languageDetectionService,
                          AIResponseService aiResponseService,
                          ChatHistoryService chatHistoryService) {
        this.languageDetectionService = languageDetectionService;
        this.aiResponseService = aiResponseService;
        this.chatHistoryService = chatHistoryService;
    }

    @Transactional
    public ChatResponse processChat(ChatRequest request, User user) {
        String rawMessage = request.getMessage() != null ? request.getMessage().trim() : "";

        // Prompt Injection / Malicious Input Guard
        if (PROMPT_INJECTION_PATTERN.matcher(rawMessage).find()) {
            ChatResponse safeResponse = new ChatResponse(
                    "Security Notice: I am the RailConnect Passenger AI Assistant. I can only assist with railway journeys, train schedules, seat availability, bookings, PNR status, and travel safety.",
                    "en",
                    "SECURITY_GUARD"
            );
            safeResponse.setSessionId(request.getSessionId());
            return safeResponse;
        }

        // Automatic Language Detection
        LanguageDetectResponse detection = languageDetectionService.detectLanguage(rawMessage);
        String targetLanguage = request.getLanguage();

        if (targetLanguage == null || targetLanguage.isBlank()) {
            if (!"en".equalsIgnoreCase(detection.getLanguageCode())) {
                targetLanguage = detection.getLanguageCode();
            } else {
                // Check if user has an active language preference saved
                LanguagePreferenceResponse pref = chatHistoryService.getLanguagePreference(user, request.getSessionId());
                if (pref != null && pref.getPreferredLanguage() != null && !pref.getPreferredLanguage().isBlank()) {
                    targetLanguage = pref.getPreferredLanguage();
                } else {
                    targetLanguage = "en";
                }
            }
        }

        // Generate AI Response with full Railway Domain Knowledge
        ChatResponse response = aiResponseService.generateResponse(request, targetLanguage);
        response.setDetectedLanguage(detection.getLanguageCode());

        // Save conversation record in AI_CHAT_HISTORY
        String sessId = request.getSessionId() != null ? request.getSessionId() : "session-anon";
        chatHistoryService.saveChatRecord(user, sessId, rawMessage, response.getResponse(), response.getLanguage());

        return response;
    }
}
