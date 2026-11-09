package com.railconnect.ai.dto;

import java.util.Map;

public class VoiceSpeakResponse {

    private String text;
    private String language;
    private String bcp47Locale;
    private String audioBase64;
    private String audioFormat;
    private Map<String, Object> speechConfig;
    private String provider;

    public VoiceSpeakResponse() {}

    public VoiceSpeakResponse(String text, String language, String bcp47Locale, String audioBase64, String audioFormat, String provider) {
        this.text = text;
        this.language = language;
        this.bcp47Locale = bcp47Locale;
        this.audioBase64 = audioBase64;
        this.audioFormat = audioFormat;
        this.provider = provider;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getBcp47Locale() { return bcp47Locale; }
    public void setBcp47Locale(String bcp47Locale) { this.bcp47Locale = bcp47Locale; }

    public String getAudioBase64() { return audioBase64; }
    public void setAudioBase64(String audioBase64) { this.audioBase64 = audioBase64; }

    public String getAudioFormat() { return audioFormat; }
    public void setAudioFormat(String audioFormat) { this.audioFormat = audioFormat; }

    public Map<String, Object> getSpeechConfig() { return speechConfig; }
    public void setSpeechConfig(Map<String, Object> speechConfig) { this.speechConfig = speechConfig; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
}
