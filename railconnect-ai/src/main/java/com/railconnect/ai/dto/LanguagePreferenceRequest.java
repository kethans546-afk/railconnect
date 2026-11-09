package com.railconnect.ai.dto;

import jakarta.validation.constraints.NotBlank;

public class LanguagePreferenceRequest {

    @NotBlank(message = "Preferred language cannot be blank")
    private String preferredLanguage;

    private Boolean voiceEnabled = true;

    private String sessionId;

    public LanguagePreferenceRequest() {}

    public LanguagePreferenceRequest(String preferredLanguage, Boolean voiceEnabled) {
        this.preferredLanguage = preferredLanguage;
        this.voiceEnabled = voiceEnabled;
    }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public Boolean getVoiceEnabled() { return voiceEnabled; }
    public void setVoiceEnabled(Boolean voiceEnabled) { this.voiceEnabled = voiceEnabled; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
