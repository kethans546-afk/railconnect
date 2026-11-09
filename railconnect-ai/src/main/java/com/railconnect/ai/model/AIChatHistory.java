package com.railconnect.ai.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.railconnect.auth.model.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_chat_history", indexes = {
        @Index(name = "idx_chat_user_id", columnList = "user_id"),
        @Index(name = "idx_chat_session_id", columnList = "session_id"),
        @Index(name = "idx_chat_timestamp", columnList = "timestamp")
})
public class AIChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"passwordHash", "createdAt", "updatedAt"})
    private User user;

    @Column(name = "session_id", nullable = false, length = 100)
    private String sessionId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String response;

    @Column(nullable = false, length = 20)
    private String language = "en";

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public AIChatHistory() {}

    public AIChatHistory(User user, String sessionId, String message, String response, String language) {
        this.user = user;
        this.sessionId = sessionId;
        this.message = message;
        this.response = response;
        this.language = language != null ? language : "en";
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
