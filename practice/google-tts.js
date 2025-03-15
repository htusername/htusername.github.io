// Google Text-to-Speech API implementation
class GoogleTTSManager {
    constructor() {
        this.apiKey = ''; // Will be set by user
        this.voice = 'en-US-Neural2-D'; // Default to male neural voice
        this.audioContext = null;
        this.audioCache = {}; // Cache for audio responses
        
        // Initialize audio context when needed (to comply with browser autoplay policies)
        this.initAudioContext = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // If context is suspended (e.g., browser policy), try to resume
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        };
        
        // Fallback to browser TTS if Google TTS is not available
        this.browserTTS = {
            isSpeechSupported: 'speechSynthesis' in window,
            voices: [],
            defaultVoice: null,
            
            init: function() {
                if (this.isSpeechSupported) {
                    this.loadVoices();
                    
                    if (speechSynthesis.onvoiceschanged !== undefined) {
                        speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
                    }
                } else {
                    console.warn('Speech synthesis is not supported in this browser.');
                }
            },
            
            loadVoices: function() {
                this.voices = speechSynthesis.getVoices();
                this.defaultVoice = this.voices.find(voice => 
                    voice.lang.includes('en') && voice.localService
                ) || this.voices[0];
            },
            
            speak: function(text, rate = 0.9) {
                if (!this.isSpeechSupported) return;
                
                window.speechSynthesis.cancel();
                
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = this.defaultVoice;
                utterance.rate = rate;
                utterance.volume = 1;
                
                window.speechSynthesis.speak(utterance);
                
                return utterance;
            }
        };
        
        // Initialize browser TTS as fallback
        this.browserTTS.init();
    }
    
    // Set API key
    setApiKey(key) {
        this.apiKey = key;
        console.log('Google TTS API key set.');
    }
    
    // Set voice
    setVoice(voice) {
        this.voice = voice;
        console.log(`Google TTS voice set to: ${voice}`);
    }
    
    // Call Google Text-to-Speech API
    async synthesizeSpeech(text) {
        this.initAudioContext();
        
        // Check if we have a cached version
        if (this.audioCache[text]) {
            return this.playAudio(this.audioCache[text]);
        }
        
        // Check if API key is set
        if (!this.apiKey) {
            console.warn('Google TTS API key not set. Using browser TTS fallback.');
            return this.browserTTS.speak(text);
        }
        
        try {
            const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + this.apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: {
                        text: text
                    },
                    voice: {
                        languageCode: 'en-US',
                        name: this.voice
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        pitch: 0,
                        speakingRate: 0.9
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const data = await response.json();
            const audioContent = data.audioContent; // Base64 encoded audio
            
            // Cache the audio content
            this.audioCache[text] = audioContent;
            
            // Play the audio
            return this.playAudio(audioContent);
        } catch (error) {
            console.error('Error with Google TTS API:', error);
            // Fallback to browser TTS
            return this.browserTTS.speak(text);
        }
    }
    
    // Play audio from base64 encoded string
    async playAudio(base64Audio) {
        this.initAudioContext();
        
        try {
            // Convert base64 to array buffer
            const binaryString = window.atob(base64Audio);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Decode the audio
            const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);
            
            // Create and play audio source
            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioContext.destination);
            source.start(0);
            
            return source;
        } catch (error) {
            console.error('Error playing audio:', error);
            return null;
        }
    }
    
    // Public method to speak text
    speak(text) {
        return this.synthesizeSpeech(text);
    }
    
    // Process text to make words clickable for TTS
    processTextToInteractive(text) {
        // Skip if blank placeholder exists
        if (text.includes('{{blank}}')) {
            return text;
        }
        
        // Split text into words, preserving spaces and punctuation
        const parts = text.split(/(\s+|[,.!?;:])/g).filter(part => part.length > 0);
        
        let processedHTML = '';
        
        parts.forEach(part => {
            if (/^\s+$/.test(part) || /^[,.!?;:]$/.test(part)) {
                // If part is whitespace or punctuation, add it directly
                processedHTML += part;
            } else {
                // For words, make them clickable
                processedHTML += `<span class="word" onclick="googleTTS.speak('${part}')">${part}</span>`;
            }
        });
        
        return processedHTML;
    }
    
    // Process a line with a blank
    processLineWithBlank(line) {
        const parts = line.split('{{blank}}');
        const before = this.processTextToInteractive(parts[0]);
        const after = this.processTextToInteractive(parts[1]);
        
        return before + '<span class="answer-blank" id="answerBlank"></span>' + after;
    }
    
    // Speak a full line (with pause for blank if needed)
    async speakLine(text) {
        // Check if there's a filled-in answer for the blank
        const answerElement = document.getElementById('answerBlank');
        const selectedWord = answerElement ? answerElement.textContent : null;
        
        // If there's a blank in the text
        if (text.includes('{{blank}}')) {
            const parts = text.split('{{blank}}');
            const beforeBlank = parts[0];
            const afterBlank = parts[1];
            
            // If we have a selected word, use it
            if (selectedWord) {
                const fullText = beforeBlank + selectedWord + afterBlank;
                return this.speak(fullText);
            } else {
                // No selected word - speak first part
                const source1 = await this.speak(beforeBlank);
                
                if (source1) {
                    // Wait for the first part to finish plus a shorter pause
                    // Reduced pause from 1000ms to 400ms
                    const duration = source1.buffer.duration * 1000 + 400; 
                    
                    // After first part finishes plus pause, speak the second part
                    setTimeout(() => {
                        this.speak(afterBlank);
                    }, duration);
                } else {
                    // If there was an error with the first part, try to speak the second part after a delay
                    // Reduced fallback pause from 1500ms to 800ms
                    setTimeout(() => {
                        this.speak(afterBlank);
                    }, 800);
                }
            }
        } else {
            // If there's no blank, just speak normally
            return this.speak(text);
        }
    }
}

// Initialize Google TTS
const googleTTS = new GoogleTTSManager();
