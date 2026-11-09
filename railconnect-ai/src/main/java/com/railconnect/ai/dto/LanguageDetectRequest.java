package com.railconnect.ai.dto;

import jakarta.validation.constraints.NotBlank;

public class LanguageDetectRequest {

    @NotBlank(message = "Text cannot be blank")
    private String text;

    public LanguageDetectRequest() {}

    public LanguageDetectRequest(String text) {
        this.text = text;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
