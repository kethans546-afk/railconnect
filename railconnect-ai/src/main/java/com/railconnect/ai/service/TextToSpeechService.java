package com.railconnect.ai.service;

import com.railconnect.ai.dto.SupportedLanguageDto;
import com.railconnect.ai.dto.VoiceSpeakRequest;
import com.railconnect.ai.dto.VoiceSpeakResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class TextToSpeechService {

    @Value("${railconnect.ai.tts-api-key:}")
    private String ttsApiKey;

    private final LanguageDetectionService languageDetectionService;

    public TextToSpeechService(LanguageDetectionService languageDetectionService) {
        this.languageDetectionService = languageDetectionService;
    }

    public VoiceSpeakResponse synthesizeSpeech(VoiceSpeakRequest request) {
        String text = request.getText() != null ? request.getText().trim() : "";
        String lang = request.getLanguage();

        if (lang == null || lang.isBlank()) {
            lang = languageDetectionService.detectLanguage(text).getLanguageCode();
        }

        SupportedLanguageDto langMeta = languageDetectionService.getLanguageMetadata(lang);
        String bcp47 = langMeta != null ? langMeta.getVoiceLocale() : "en-IN";

        Map<String, Object> speechConfig = new HashMap<>();
        speechConfig.put("voiceLocale", bcp47);
        speechConfig.put("rate", request.getRate() != null ? request.getRate() : 1.0);
        speechConfig.put("pitch", request.getPitch() != null ? request.getPitch() : 1.0);
        speechConfig.put("gender", request.getVoiceGender() != null ? request.getVoiceGender() : "FEMALE");
        speechConfig.put("nativeName", langMeta != null ? langMeta.getNativeName() : "English");

        // Generate synthetic audio chime / audio payload in WAV format (pure Java RIFF WAV generator)
        byte[] wavAudio = generateNotificationAudioWav(440, 200);
        String audioBase64 = Base64.getEncoder().encodeToString(wavAudio);

        VoiceSpeakResponse response = new VoiceSpeakResponse(
                text,
                lang,
                bcp47,
                audioBase64,
                "audio/wav",
                "WEB_SPEECH_API_WITH_BACKEND_CHIME"
        );
        response.setSpeechConfig(speechConfig);

        return response;
    }

    /**
     * Pure Java PCM 16-bit Mono WAV generator for instant audio feedback & tone alerts
     */
    private byte[] generateNotificationAudioWav(int frequencyHz, int durationMs) {
        try {
            int sampleRate = 16000;
            int numSamples = (durationMs * sampleRate) / 1000;
            byte[] pcmData = new byte[numSamples * 2];

            for (int i = 0; i < numSamples; i++) {
                double time = (double) i / sampleRate;
                // Soft sine wave with gentle exponential decay envelope
                double envelope = Math.exp(-3.0 * i / numSamples);
                short sample = (short) (Math.sin(2.0 * Math.PI * frequencyHz * time) * 16384 * envelope);
                pcmData[i * 2] = (byte) (sample & 0xFF);
                pcmData[i * 2 + 1] = (byte) ((sample >> 8) & 0xFF);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            DataOutputStream dos = new DataOutputStream(baos);

            // RIFF header
            dos.writeBytes("RIFF");
            dos.writeInt(Integer.reverseBytes(36 + pcmData.length));
            dos.writeBytes("WAVE");

            // fmt chunk
            dos.writeBytes("fmt ");
            dos.writeInt(Integer.reverseBytes(16)); // Chunk size 16 for PCM
            dos.writeShort(Short.reverseBytes((short) 1)); // Audio format 1 = PCM
            dos.writeShort(Short.reverseBytes((short) 1)); // Number of channels = 1 (Mono)
            dos.writeInt(Integer.reverseBytes(sampleRate)); // Sample rate
            dos.writeInt(Integer.reverseBytes(sampleRate * 2)); // Byte rate (SampleRate * NumChannels * BitsPerSample/8)
            dos.writeShort(Short.reverseBytes((short) 2)); // Block align
            dos.writeShort(Short.reverseBytes((short) 16)); // Bits per sample

            // data chunk
            dos.writeBytes("data");
            dos.writeInt(Integer.reverseBytes(pcmData.length));
            dos.write(pcmData);

            dos.flush();
            return baos.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }
}
