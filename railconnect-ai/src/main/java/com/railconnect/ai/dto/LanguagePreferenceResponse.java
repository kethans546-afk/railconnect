package com.railconnect.ai.dto;

public class LanguagePreferenceResponse {

    private String preferredLanguage;
    private String languageName;
    private String nativeName;
    private Boolean voiceEnabled;
    private String message;

    public LanguagePreferenceResponse() {}

    public LanguagePreferenceResponse(String preferredLanguage, String languageName, String nativeName, Boolean voiceEnabled, String message) {
        this.preferredLanguage = preferredLanguage;
        this.languageName = languageName;
        this.nativeName = nativeName;
        this.voiceEnabled = voiceEnabled;
        this.message = message;
    }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public String getLanguageName() { return languageName; }
    public void setLanguageName(String languageName) { this.languageName = languageName; }

    public String getNativeName() { return nativeName; }
    public void setNativeName(String nativeName) { this.nativeName = nativeName; }

    public Boolean getVoiceEnabled() { return voiceEnabled; }
    public void setVoiceEnabled(Boolean voiceEnabled) { this.voiceEnabled = voiceEnabled; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
