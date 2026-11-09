package com.railconnect.ai.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.railconnect.auth.model.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_language_preference", indexes = {
        @Index(name = "idx_lang_pref_user", columnList = "user_id"),
        @Index(name = "idx_lang_pref_session", columnList = "session_id")
})
public class UserLanguagePreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    @JsonIgnoreProperties({"passwordHash", "createdAt", "updatedAt"})
    private User user;

    @Column(name = "session_id", length = 100)
    private String sessionId;

    @Column(name = "preferred_language", nullable = false, length = 20)
    private String preferredLanguage = "en";

    @Column(name = "voice_enabled", nullable = false)
    private Boolean voiceEnabled = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public UserLanguagePreference() {}

    public UserLanguagePreference(User user, String sessionId, String preferredLanguage, Boolean voiceEnabled) {
        this.user = user;
        this.sessionId = sessionId;
        this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "en";
        this.voiceEnabled = voiceEnabled != null ? voiceEnabled : true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
        this.updatedAt = LocalDateTime.now();
    }

    public Boolean getVoiceEnabled() { return voiceEnabled; }
    public void setVoiceEnabled(Boolean voiceEnabled) {
        this.voiceEnabled = voiceEnabled;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
