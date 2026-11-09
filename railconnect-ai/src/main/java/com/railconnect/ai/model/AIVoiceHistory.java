package com.railconnect.ai.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.railconnect.auth.model.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_voice_history", indexes = {
        @Index(name = "idx_voice_user_id", columnList = "user_id"),
        @Index(name = "idx_voice_session_id", columnList = "session_id"),
        @Index(name = "idx_voice_timestamp", columnList = "timestamp")
})
public class AIVoiceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"passwordHash", "createdAt", "updatedAt"})
    private User user;

    @Column(name = "session_id", nullable = false, length = 100)
    private String sessionId;

    @Column(name = "recognized_text", nullable = false, columnDefinition = "TEXT")
    private String recognizedText;

    @Column(name = "response_text", nullable = false, columnDefinition = "TEXT")
    private String responseText;

    @Column(nullable = false, length = 20)
    private String language = "en";

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public AIVoiceHistory() {}

    public AIVoiceHistory(User user, String sessionId, String recognizedText, String responseText, String language) {
        this.user = user;
        this.sessionId = sessionId;
        this.recognizedText = recognizedText;
        this.responseText = responseText;
        this.language = language != null ? language : "en";
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getRecognizedText() { return recognizedText; }
    public void setRecognizedText(String recognizedText) { this.recognizedText = recognizedText; }

    public String getResponseText() { return responseText; }
    public void setResponseText(String responseText) { this.responseText = responseText; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
