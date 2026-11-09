package com.railconnect.ai.controller;

import com.railconnect.ai.dto.*;
import com.railconnect.ai.model.AIVoiceHistory;
import com.railconnect.ai.repository.AIVoiceHistoryRepository;
import com.railconnect.ai.service.SpeechToTextService;
import com.railconnect.ai.service.TextToSpeechService;
import com.railconnect.ai.service.VoiceProcessingService;
import com.railconnect.auth.jwt.JwtUtil;
import com.railconnect.auth.model.User;
import com.railconnect.auth.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai/voice")
@CrossOrigin(origins = "*", maxAge = 3600)
public class VoiceAssistantController {

    private final VoiceProcessingService voiceProcessingService;
    private final SpeechToTextService speechToTextService;
    private final TextToSpeechService textToSpeechService;
    private final AIVoiceHistoryRepository voiceHistoryRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public VoiceAssistantController(VoiceProcessingService voiceProcessingService,
                                    SpeechToTextService speechToTextService,
                                    TextToSpeechService textToSpeechService,
                                    AIVoiceHistoryRepository voiceHistoryRepository,
                                    UserRepository userRepository,
                                    JwtUtil jwtUtil) {
        this.voiceProcessingService = voiceProcessingService;
        this.speechToTextService = speechToTextService;
        this.textToSpeechService = textToSpeechService;
        this.voiceHistoryRepository = voiceHistoryRepository;
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

    @PostMapping("/transcribe")
    public ResponseEntity<VoiceTranscribeResponse> transcribe(@RequestBody VoiceTranscribeRequest request) {
        VoiceTranscribeResponse response = speechToTextService.transcribeAudio(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/speak")
    public ResponseEntity<VoiceSpeakResponse> speak(@Valid @RequestBody VoiceSpeakRequest request) {
        VoiceSpeakResponse response = textToSpeechService.synthesizeSpeech(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/process")
    public ResponseEntity<ChatResponse> processVoice(
            @RequestBody VoiceTranscribeRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        ChatResponse response = voiceProcessingService.processVoiceQuery(request, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<AIVoiceHistory>> getVoiceHistory(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = resolveAuthenticatedUser(authHeader);
        if (user != null) {
            return ResponseEntity.ok(voiceHistoryRepository.findTop30ByUserIdOrderByTimestampDesc(user.getId()));
        }
        if (sessionId != null && !sessionId.isBlank()) {
            return ResponseEntity.ok(voiceHistoryRepository.findTop30BySessionIdOrderByTimestampDesc(sessionId));
        }
        return ResponseEntity.ok(List.of());
    }
}
