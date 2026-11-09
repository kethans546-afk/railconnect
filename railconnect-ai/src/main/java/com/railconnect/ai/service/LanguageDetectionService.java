package com.railconnect.ai.service;

import com.railconnect.ai.dto.LanguageDetectResponse;
import com.railconnect.ai.dto.SupportedLanguageDto;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LanguageDetectionService {

    private static final Map<String, SupportedLanguageDto> SUPPORTED_LANGUAGES = new LinkedHashMap<>();

    static {
        SUPPORTED_LANGUAGES.put("en", new SupportedLanguageDto(
                "en", "English", "English", "en-IN",
                "Hello! Welcome to RailConnect AI Assistant. How may I help you today?",
                "Show trains from Chennai to Bangalore"
        ));
        SUPPORTED_LANGUAGES.put("hi", new SupportedLanguageDto(
                "hi", "Hindi", "हिन्दी", "hi-IN",
                "नमस्ते! रेलकनेक्ट एआई सहायक में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?",
                "दिल्ली से मुंबई के लिए ट्रेनें दिखाएं"
        ));
        SUPPORTED_LANGUAGES.put("te", new SupportedLanguageDto(
                "te", "Telugu", "తెలుగు", "te-IN",
                "నమస్కారం! రైల్‌కనెక్ట్ AI అసిస్టెంట్‌కి స్వాగతం. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?",
                "చెన్నై నుంచి తిరుచ్చికి రైళ్లు చూపించు"
        ));
        SUPPORTED_LANGUAGES.put("ta", new SupportedLanguageDto(
                "ta", "Tamil", "தமிழ்", "ta-IN",
                "வணக்கம்! ரெயில்கனெக்ட் AI உதவியாளருக்கு வரவேற்கிறோம். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
                "சென்னையிலிருந்து மதுரைக்கு ரயில்களைக் காட்டுங்கள்"
        ));
        SUPPORTED_LANGUAGES.put("kn", new SupportedLanguageDto(
                "kn", "Kannada", "ಕನ್ನಡ", "kn-IN",
                "ನಮಸ್ಕಾರ! ರೈಲ್‌ಕನೆಕ್ಟ್ AI ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
                "ಬೆಂಗಳೂರಿನಿಂದ ಚೆನ್ನೈಗೆ ರೈಲುಗಳನ್ನು ತೋರಿಸಿ"
        ));
        SUPPORTED_LANGUAGES.put("ml", new SupportedLanguageDto(
                "ml", "Malayalam", "മലയാളം", "ml-IN",
                "നമസ്കാരം! റെയിൽകണക്റ്റ് AI അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം?",
                "ചെന്നൈയിൽ നിന്ന് കോയമ്പത്തൂരിലേക്കുള്ള ട്രെയിനുകൾ കാണിക്കുക"
        ));
        SUPPORTED_LANGUAGES.put("bn", new SupportedLanguageDto(
                "bn", "Bengali", "বাংলা", "bn-IN",
                "নমস্কার! রেলকানেক্ট এআই সহকারীতে আপনাকে স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
                "হাওড়া থেকে নতুন দিল্লি যাওয়ার ট্রেন দেখান"
        ));
        SUPPORTED_LANGUAGES.put("mr", new SupportedLanguageDto(
                "mr", "Marathi", "मराठी", "mr-IN",
                "नमस्कार! रेलकनेक्ट एआय सहाय्यकामध्ये आपले स्वागत आहे. मी आपल्याला कशी मदत करू शकतो?",
                "मुंबई ते पुणे दरम्यान धावणाऱ्या गाड्या दाखवा"
        ));
    }

    private static final Set<String> MARATHI_MARKERS = new HashSet<>(Arrays.asList(
            "आहे", "नाही", "कसा", "कशी", "कसे", "करा", "स्थानक", "गाडी", "गाड्या", "तिकीट",
            "वेळ", "सांगा", "माहिती", "कधी", "कुठे", "पाहिजे", "आहेत", "करावे", "झाले", "होते"
    ));

    private static final Set<String> HINDI_MARKERS = new HashSet<>(Arrays.asList(
            "है", "हैं", "नहीं", "कैसे", "करना", "स्टेशन", "ट्रेन", "ट्रेनें", "टिकट",
            "समय", "बताओ", "जानकारी", "कब", "कहाँ", "चाहिए", "होगा", "सकते", "दीजिए"
    ));

    public List<SupportedLanguageDto> getSupportedLanguages() {
        return new ArrayList<>(SUPPORTED_LANGUAGES.values());
    }

    public SupportedLanguageDto getLanguageMetadata(String langCode) {
        if (langCode == null || !SUPPORTED_LANGUAGES.containsKey(langCode.toLowerCase())) {
            return SUPPORTED_LANGUAGES.get("en");
        }
        return SUPPORTED_LANGUAGES.get(langCode.toLowerCase());
    }

    public boolean isSupported(String langCode) {
        return langCode != null && SUPPORTED_LANGUAGES.containsKey(langCode.toLowerCase());
    }

    public LanguageDetectResponse detectLanguage(String text) {
        if (text == null || text.trim().isEmpty()) {
            return new LanguageDetectResponse("en", "English", "English", 1.0, "Latin");
        }

        int teluguCount = 0;
        int tamilCount = 0;
        int kannadaCount = 0;
        int malayalamCount = 0;
        int bengaliCount = 0;
        int devanagariCount = 0;
        int latinCount = 0;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            Character.UnicodeBlock block = Character.UnicodeBlock.of(ch);

            if (block == Character.UnicodeBlock.TELUGU) teluguCount++;
            else if (block == Character.UnicodeBlock.TAMIL) tamilCount++;
            else if (block == Character.UnicodeBlock.KANNADA) kannadaCount++;
            else if (block == Character.UnicodeBlock.MALAYALAM) malayalamCount++;
            else if (block == Character.UnicodeBlock.BENGALI) bengaliCount++;
            else if (block == Character.UnicodeBlock.DEVANAGARI) devanagariCount++;
            else if (Character.isLetter(ch) && ch < 128) latinCount++;
        }

        int totalIndic = teluguCount + tamilCount + kannadaCount + malayalamCount + bengaliCount + devanagariCount;

        if (totalIndic > 0) {
            if (teluguCount >= tamilCount && teluguCount >= kannadaCount && teluguCount >= malayalamCount && teluguCount >= bengaliCount && teluguCount >= devanagariCount) {
                return new LanguageDetectResponse("te", "Telugu", "తెలుగు", 0.98, "Telugu");
            }
            if (tamilCount >= kannadaCount && tamilCount >= malayalamCount && tamilCount >= bengaliCount && tamilCount >= devanagariCount) {
                return new LanguageDetectResponse("ta", "Tamil", "தமிழ்", 0.98, "Tamil");
            }
            if (kannadaCount >= malayalamCount && kannadaCount >= bengaliCount && kannadaCount >= devanagariCount) {
                return new LanguageDetectResponse("kn", "Kannada", "ಕನ್ನಡ", 0.98, "Kannada");
            }
            if (malayalamCount >= bengaliCount && malayalamCount >= devanagariCount) {
                return new LanguageDetectResponse("ml", "Malayalam", "മലയാളം", 0.98, "Malayalam");
            }
            if (bengaliCount >= devanagariCount) {
                return new LanguageDetectResponse("bn", "Bengali", "বাংলা", 0.98, "Bengali");
            }

            // Devanagari script: Distinguish Marathi vs Hindi
            String lowerText = text.toLowerCase();
            String[] tokens = lowerText.split("\\s+");
            int marathiScore = 0;
            int hindiScore = 0;

            for (String t : tokens) {
                if (MARATHI_MARKERS.contains(t)) marathiScore++;
                if (HINDI_MARKERS.contains(t)) hindiScore++;
            }

            if (marathiScore > hindiScore) {
                return new LanguageDetectResponse("mr", "Marathi", "मराठी", 0.95, "Devanagari");
            } else {
                return new LanguageDetectResponse("hi", "Hindi", "हिन्दी", 0.95, "Devanagari");
            }
        }

        // Romanized text heuristics
        String normalized = text.toLowerCase().trim();
        if (containsAny(normalized, "cheppandi", "ekkada", "railu", "railu bandi", "chupinchu", "pampandi", "undi", "leka", "dabbulu", "pranamamu")) {
            return new LanguageDetectResponse("te", "Telugu", "తెలుగు", 0.85, "Latin-Transliterated");
        }
        if (containsAny(normalized, "vanakkam", "kaatungal", "enga", "epdi", "solunga", "theriyuma", "neram", "kattanam", "railgal", "vandi")) {
            return new LanguageDetectResponse("ta", "Tamil", "தமிழ்", 0.85, "Latin-Transliterated");
        }
        if (containsAny(normalized, "namaskara", "thorisi", "yelli", "hege", "heli", "samaya", "railugalu", "beku", "yavaga", "yestu")) {
            return new LanguageDetectResponse("kn", "Kannada", "ಕನ್ನಡ", 0.85, "Latin-Transliterated");
        }
        if (containsAny(normalized, "namaskaram", "kaanikku", "evide", "engane", "parayu", "samayam", "trainukal", "venam", "eppol")) {
            return new LanguageDetectResponse("ml", "Malayalam", "മലയാളം", 0.85, "Latin-Transliterated");
        }
        if (containsAny(normalized, "nomoshkar", "dekhan", "kothay", "kemon", "bolun", "shomoy", "dorkar", "kobe", "koto")) {
            return new LanguageDetectResponse("bn", "Bengali", "বাংলা", 0.85, "Latin-Transliterated");
        }
        if (containsAny(normalized, "namaskar", "dakhva", "kuthe", "kasa", "sanga", "vel", "pahije", "kadhi", "kitva")) {
            return new LanguageDetectResponse("mr", "Marathi", "मराठी", 0.85, "Latin-Transliterated");
        }
        if (containsAny(normalized, "namaste", "dikhaye", "kahan", "kaise", "batao", "samay", "chahiye", "kab", "kitna", "madad")) {
            return new LanguageDetectResponse("hi", "Hindi", "हिन्दी", 0.85, "Latin-Transliterated");
        }

        return new LanguageDetectResponse("en", "English", "English", 0.95, "Latin");
    }

    private boolean containsAny(String input, String... keywords) {
        for (String kw : keywords) {
            if (input.contains(kw)) return true;
        }
        return false;
    }
}
