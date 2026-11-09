package com.railconnect.ai.dto;

import jakarta.validation.constraints.NotBlank;

public class VoiceSpeakRequest {

    @NotBlank(message = "Text cannot be blank")
    private String text;

    private String language = "en";
    private String voiceGender = "FEMALE";
    private Double rate = 1.0;
    private Double pitch = 1.0;

    public VoiceSpeakRequest() {}

    public VoiceSpeakRequest(String text, String language) {
        this.text = text;
        this.language = language != null ? language : "en";
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getVoiceGender() { return voiceGender; }
    public void setVoiceGender(String voiceGender) { this.voiceGender = voiceGender; }

    public Double getRate() { return rate; }
    public void setRate(Double rate) { this.rate = rate; }

    public Double getPitch() { return pitch; }
    public void setPitch(Double pitch) { this.pitch = pitch; }
}
