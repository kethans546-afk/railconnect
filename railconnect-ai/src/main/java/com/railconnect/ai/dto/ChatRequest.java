package com.railconnect.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChatRequest {

    @NotBlank(message = "Message cannot be empty")
    @Size(max = 2000, message = "Message exceeds maximum permitted length of 2000 characters")
    private String message;

    private String sessionId;

    private String language; // Optional explicit language code ('en', 'hi', 'te', 'ta', 'kn', 'ml', 'bn', 'mr')

    private Boolean voiceInput = false;

    public ChatRequest() {}

    public ChatRequest(String message, String sessionId, String language) {
        this.message = message;
        this.sessionId = sessionId;
        this.language = language;
        this.voiceInput = false;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public Boolean getVoiceInput() { return voiceInput; }
    public void setVoiceInput(Boolean voiceInput) { this.voiceInput = voiceInput; }
}
