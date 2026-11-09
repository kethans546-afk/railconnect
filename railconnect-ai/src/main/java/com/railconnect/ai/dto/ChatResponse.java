package com.railconnect.ai.dto;

import java.util.List;
import java.util.Map;

public class ChatResponse {

    private String response;
    private String language;
    private String detectedLanguage;
    private String intent;
    private List<String> suggestedQuestions;
    private Map<String, Object> structuredData;
    private String sessionId;
    private String audioBase64;
    private String audioFormat;
    private String executionMode; // e.g. "AUTONOMOUS_DOMAIN_AI" or "EXTERNAL_LLM"
    private Long timestamp;

    public ChatResponse() {
        this.timestamp = System.currentTimeMillis();
    }

    public ChatResponse(String response, String language, String intent) {
        this.response = response;
        this.language = language;
        this.intent = intent;
        this.executionMode = "AUTONOMOUS_DOMAIN_AI";
        this.timestamp = System.currentTimeMillis();
    }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getDetectedLanguage() { return detectedLanguage; }
    public void setDetectedLanguage(String detectedLanguage) { this.detectedLanguage = detectedLanguage; }

    public String getIntent() { return intent; }
    public void setIntent(String intent) { this.intent = intent; }

    public List<String> getSuggestedQuestions() { return suggestedQuestions; }
    public void setSuggestedQuestions(List<String> suggestedQuestions) { this.suggestedQuestions = suggestedQuestions; }

    public Map<String, Object> getStructuredData() { return structuredData; }
    public void setStructuredData(Map<String, Object> structuredData) { this.structuredData = structuredData; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getAudioBase64() { return audioBase64; }
    public void setAudioBase64(String audioBase64) { this.audioBase64 = audioBase64; }

    public String getAudioFormat() { return audioFormat; }
    public void setAudioFormat(String audioFormat) { this.audioFormat = audioFormat; }

    public String getExecutionMode() { return executionMode; }
    public void setExecutionMode(String executionMode) { this.executionMode = executionMode; }

    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
}
