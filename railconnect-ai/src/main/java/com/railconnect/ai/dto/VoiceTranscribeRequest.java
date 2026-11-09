package com.railconnect.ai.dto;

public class VoiceTranscribeRequest {

    private String audioBase64;
    private String audioFormat = "webm"; // e.g. "webm", "wav", "mp3", "ogg"
    private String language; // hint or null for auto-detect
    private String sessionId;
    private String transcriptFallback; // Optional client-side transcription preview

    public VoiceTranscribeRequest() {}

    public String getAudioBase64() { return audioBase64; }
    public void setAudioBase64(String audioBase64) { this.audioBase64 = audioBase64; }

    public String getAudioFormat() { return audioFormat; }
    public void setAudioFormat(String audioFormat) { this.audioFormat = audioFormat; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getTranscriptFallback() { return transcriptFallback; }
    public void setTranscriptFallback(String transcriptFallback) { this.transcriptFallback = transcriptFallback; }
}
