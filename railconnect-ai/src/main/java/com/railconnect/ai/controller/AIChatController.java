package com.railconnect.ai.controller;

import com.railconnect.ai.dto.*;
import com.railconnect.ai.model.AIChatHistory;
import com.railconnect.ai.service.ChatHistoryService;
import com.railconnect.ai.service.ChatbotService;
import com.railconnect.ai.service.LanguageDetectionService;
import com.railconnect.auth.jwt.JwtUtil;
import com.railconnect.auth.model.User;
import com.railconnect.auth.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AIChatController {

    private final ChatbotService chatbotService;
    private final ChatHistoryService chatHistoryService;
    private final LanguageDetectionService languageDetectionService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AIChatController(ChatbotService chatbotService,
                            ChatHistoryService chatHistoryService,
                            LanguageDetectionService languageDetectionService,
                            UserRepository userRepository,
                            JwtUtil jwtUtil) {
        this.chatbotService = chatbotService;
        this.chatHistoryService = chatHistoryService;
        this.languageDetectionService = languageDetectionService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    private User resolveAuthenticatedUser(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                Long userId = jwtUtil.extractUserId(token);
                if (userId != null) {
                    return userRepository.findById(userId).orElse(null);
                }
            } catch (Exception ignored) {}
        }
        return null;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(
            @Valid @RequestBody ChatRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        ChatResponse response = chatbotService.processChat(request, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/chat/history")
    public ResponseEntity<List<AIChatHistory>> getHistory(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        List<AIChatHistory> history = chatHistoryService.getChatHistory(user, sessionId);
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/chat/history")
    public ResponseEntity<Map<String, Object>> clearHistory(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        chatHistoryService.clearChatHistory(user, sessionId);
        return ResponseEntity.ok(Map.of("success", true, "message", "Conversation history cleared successfully"));
    }

    @GetMapping("/supported-languages")
    public ResponseEntity<List<SupportedLanguageDto>> getSupportedLanguages() {
        return ResponseEntity.ok(languageDetectionService.getSupportedLanguages());
    }

    @PostMapping("/language/detect")
    public ResponseEntity<LanguageDetectResponse> detectLanguage(@Valid @RequestBody LanguageDetectRequest request) {
        return ResponseEntity.ok(languageDetectionService.detectLanguage(request.getText()));
    }

    @GetMapping("/language/preference")
    public ResponseEntity<LanguagePreferenceResponse> getLanguagePreference(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        return ResponseEntity.ok(chatHistoryService.getLanguagePreference(user, sessionId));
    }

    @PostMapping("/language/preference")
    public ResponseEntity<LanguagePreferenceResponse> setLanguagePreference(
            @Valid @RequestBody LanguagePreferenceRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        return ResponseEntity.ok(chatHistoryService.setLanguagePreference(request, user));
    }
}
