package com.railconnect.ai.service;

import com.railconnect.ai.dto.LanguagePreferenceRequest;
import com.railconnect.ai.dto.LanguagePreferenceResponse;
import com.railconnect.ai.dto.SupportedLanguageDto;
import com.railconnect.ai.model.AIChatHistory;
import com.railconnect.ai.model.UserLanguagePreference;
import com.railconnect.ai.repository.AIChatHistoryRepository;
import com.railconnect.ai.repository.AIVoiceHistoryRepository;
import com.railconnect.ai.repository.UserLanguagePreferenceRepository;
import com.railconnect.auth.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChatHistoryService {

    private final AIChatHistoryRepository chatHistoryRepository;
    private final AIVoiceHistoryRepository voiceHistoryRepository;
    private final UserLanguagePreferenceRepository preferenceRepository;
    private final LanguageDetectionService languageDetectionService;

    public ChatHistoryService(AIChatHistoryRepository chatHistoryRepository,
                              AIVoiceHistoryRepository voiceHistoryRepository,
                              UserLanguagePreferenceRepository preferenceRepository,
                              LanguageDetectionService languageDetectionService) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.voiceHistoryRepository = voiceHistoryRepository;
        this.preferenceRepository = preferenceRepository;
        this.languageDetectionService = languageDetectionService;
    }

    @Transactional
    public AIChatHistory saveChatRecord(User user, String sessionId, String message, String response, String language) {
        String sessId = sessionId != null && !sessionId.isBlank() ? sessionId : "session-anon";
        AIChatHistory history = new AIChatHistory(user, sessId, message, response, language);
        return chatHistoryRepository.save(history);
    }

    @Transactional(readOnly = true)
    public List<AIChatHistory> getChatHistory(User user, String sessionId) {
        if (user != null) {
            return chatHistoryRepository.findTop50ByUserIdOrderByTimestampDesc(user.getId());
        }
        if (sessionId != null && !sessionId.isBlank()) {
            return chatHistoryRepository.findTop50BySessionIdOrderByTimestampDesc(sessionId);
        }
        return List.of();
    }

    @Transactional
    public void clearChatHistory(User user, String sessionId) {
        if (user != null) {
            chatHistoryRepository.deleteByUserId(user.getId());
            voiceHistoryRepository.deleteByUserId(user.getId());
        } else if (sessionId != null && !sessionId.isBlank()) {
            chatHistoryRepository.deleteBySessionId(sessionId);
            voiceHistoryRepository.deleteBySessionId(sessionId);
        }
    }

    @Transactional(readOnly = true)
    public LanguagePreferenceResponse getLanguagePreference(User user, String sessionId) {
        Optional<UserLanguagePreference> prefOpt = Optional.empty();
        if (user != null) {
            prefOpt = preferenceRepository.findByUserId(user.getId());
        }
        if (prefOpt.isEmpty() && sessionId != null) {
            prefOpt = preferenceRepository.findBySessionId(sessionId);
        }

        String lang = prefOpt.map(UserLanguagePreference::getPreferredLanguage).orElse("en");
        Boolean voice = prefOpt.map(UserLanguagePreference::getVoiceEnabled).orElse(true);

        SupportedLanguageDto meta = languageDetectionService.getLanguageMetadata(lang);
        return new LanguagePreferenceResponse(lang, meta.getName(), meta.getNativeName(), voice, "Language preference retrieved successfully");
    }

    @Transactional
    public LanguagePreferenceResponse setLanguagePreference(LanguagePreferenceRequest req, User user) {
        String lang = req.getPreferredLanguage() != null ? req.getPreferredLanguage().toLowerCase() : "en";
        if (!languageDetectionService.isSupported(lang)) {
            lang = "en";
        }
        Boolean voice = req.getVoiceEnabled() != null ? req.getVoiceEnabled() : true;

        UserLanguagePreference pref;
        if (user != null) {
            pref = preferenceRepository.findByUserId(user.getId()).orElse(new UserLanguagePreference(user, req.getSessionId(), lang, voice));
            pref.setUser(user);
        } else {
            String sessId = req.getSessionId() != null ? req.getSessionId() : "session-anon";
            pref = preferenceRepository.findBySessionId(sessId).orElse(new UserLanguagePreference(null, sessId, lang, voice));
            pref.setSessionId(sessId);
        }

        pref.setPreferredLanguage(lang);
        pref.setVoiceEnabled(voice);
        preferenceRepository.save(pref);

        SupportedLanguageDto meta = languageDetectionService.getLanguageMetadata(lang);
        return new LanguagePreferenceResponse(lang, meta.getName(), meta.getNativeName(), voice, "Language preference updated to " + meta.getName() + " (" + meta.getNativeName() + ")");
    }
}
