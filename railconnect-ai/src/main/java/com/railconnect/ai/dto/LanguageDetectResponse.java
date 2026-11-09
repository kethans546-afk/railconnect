package com.railconnect.ai.dto;

public class LanguageDetectResponse {

    private String languageCode;
    private String languageName;
    private String nativeName;
    private Double confidence;
    private String script;

    public LanguageDetectResponse() {}

    public LanguageDetectResponse(String languageCode, String languageName, String nativeName, Double confidence, String script) {
        this.languageCode = languageCode;
        this.languageName = languageName;
        this.nativeName = nativeName;
        this.confidence = confidence;
        this.script = script;
    }

    public String getLanguageCode() { return languageCode; }
    public void setLanguageCode(String languageCode) { this.languageCode = languageCode; }

    public String getLanguageName() { return languageName; }
    public void setLanguageName(String languageName) { this.languageName = languageName; }

    public String getNativeName() { return nativeName; }
    public void setNativeName(String nativeName) { this.nativeName = nativeName; }

    public Double getConfidence() { return confidence; }
    public void setConfidence(Double confidence) { this.confidence = confidence; }

    public String getScript() { return script; }
    public void setScript(String script) { this.script = script; }
}
