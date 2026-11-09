package com.railconnect.ai.dto;

public class SupportedLanguageDto {

    private String code;
    private String name;
    private String nativeName;
    private String voiceLocale;
    private String sampleGreeting;
    private String sampleVoiceQuery;

    public SupportedLanguageDto() {}

    public SupportedLanguageDto(String code, String name, String nativeName, String voiceLocale, String sampleGreeting, String sampleVoiceQuery) {
        this.code = code;
        this.name = name;
        this.nativeName = nativeName;
        this.voiceLocale = voiceLocale;
        this.sampleGreeting = sampleGreeting;
        this.sampleVoiceQuery = sampleVoiceQuery;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNativeName() { return nativeName; }
    public void setNativeName(String nativeName) { this.nativeName = nativeName; }

    public String getVoiceLocale() { return voiceLocale; }
    public void setVoiceLocale(String voiceLocale) { this.voiceLocale = voiceLocale; }

    public String getSampleGreeting() { return sampleGreeting; }
    public void setSampleGreeting(String sampleGreeting) { this.sampleGreeting = sampleGreeting; }

    public String getSampleVoiceQuery() { return sampleVoiceQuery; }
    public void setSampleVoiceQuery(String sampleVoiceQuery) { this.sampleVoiceQuery = sampleVoiceQuery; }
}
