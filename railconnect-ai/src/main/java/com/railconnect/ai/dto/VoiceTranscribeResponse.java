package com.railconnect.ai.dto;

public class VoiceTranscribeResponse {

    private String recognizedText;
    private String detectedLanguage;
    private Double confidence;
    private String provider; // "WEB_SPEECH_API" or "EXTERNAL_STT" or "AUDIO_PROCESSOR"

    public VoiceTranscribeResponse() {}

    public VoiceTranscribeResponse(String recognizedText, String detectedLanguage, Double confidence, String provider) {
        this.recognizedText = recognizedText;
        this.detectedLanguage = detectedLanguage;
        this.confidence = confidence;
        this.provider = provider;
    }

    public String getRecognizedText() { return recognizedText; }
    public void setRecognizedText(String recognizedText) { this.recognizedText = recognizedText; }

    public String getDetectedLanguage() { return detectedLanguage; }
    public void setDetectedLanguage(String detectedLanguage) { this.detectedLanguage = detectedLanguage; }

    public Double getConfidence() { return confidence; }
    public void setConfidence(Double confidence) { this.confidence = confidence; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
}
