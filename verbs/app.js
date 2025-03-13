// Replace with your Google Cloud API key
const GOOGLE_TTS_API_KEY = 'AIzaSyBBe1XfNjodUza5EHDLbs6HTWk8O64b5c8';

// Create shuffled copy of verbs
let verbSets = [];
let currentVerbIndex = 0;

// Function to reveal a card
function revealCard(tense) {
    const card = document.getElementById(`${tense}-card`);
    if (card) {
        card.classList.add('revealed');
    }
}

// Function to update the flashcards
function updateFlashcards() {
    const currentVerb = verbSets[currentVerbIndex];
    
    // Reset card states
    document.getElementById('past-card').classList.remove('revealed');
    document.getElementById('future-card').classList.remove('revealed');
    
    // Update past card text
    const pastCard = document.getElementById('past-card');
    pastCard.querySelector('.verb').textContent = currentVerb.past.word;
    pastCard.querySelector('.sentence').textContent = currentVerb.past.sentence;
    
    // Update present card text
    const presentCard = document.querySelector('.flashcard.revealed');
    presentCard.querySelector('.verb').textContent = currentVerb.present.word;
    presentCard.querySelector('.sentence').textContent = currentVerb.present.sentence;
    
    // Update future card text
    const futureCard = document.getElementById('future-card');
    futureCard.querySelector('.verb').textContent = currentVerb.future.word;
    futureCard.querySelector('.sentence').textContent = currentVerb.future.sentence;
    
    // Update counter
    document.getElementById('verb-counter').textContent = `Verb ${currentVerbIndex + 1} of ${verbSets.length}`;
}

// Function to play word audio using Google TTS
function playWordAudio(tense) {
    // Only play audio if card is revealed
    if (tense !== 'present' && !document.getElementById(`${tense}-card`).classList.contains('revealed')) {
        return;
    }
    
    const currentVerb = verbSets[currentVerbIndex];
    const textToSpeak = currentVerb[tense].word;
    
    // Use Google Text-to-Speech
    googleTTS(textToSpeak);
}

// Function to play sentence audio using Google TTS
function playSentenceAudio(tense) {
    // Only play audio if card is revealed
    if (tense !== 'present' && !document.getElementById(`${tense}-card`).classList.contains('revealed')) {
        return;
    }
    
    const currentVerb = verbSets[currentVerbIndex];
    const textToSpeak = currentVerb[tense].sentence;
    
    // Use Google Text-to-Speech
    googleTTS(textToSpeak);
}

// Function to use Google Text-to-Speech API
async function googleTTS(text) {
    const statusIndicator = document.getElementById('status-indicator');
    statusIndicator.textContent = 'Loading...';
    statusIndicator.style.display = 'inline-block';
    
    console.log(`🎯 Attempting Google TTS for text: "${text}"`);
    console.log(`🔑 Using API key: ${GOOGLE_TTS_API_KEY.substring(0, 5)}...${GOOGLE_TTS_API_KEY.substring(GOOGLE_TTS_API_KEY.length - 5)}`);
    
    try {
        console.log('📡 Sending request to Google TTS API...');
        const requestBody = {
            input: { text },
            voice: { languageCode: 'en-US', name: 'en-US-Neural2-D' },
            audioConfig: { 
                audioEncoding: 'MP3',
                speakingRate: 0.9  // Slightly slower for ESL learners
            }
        };
        console.log('📦 Request payload:', requestBody);
        
        const response = await fetch(
            `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );
        
        console.log(`🔍 Response status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('📛 API Error response:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('✅ Received response from Google TTS API');
        console.log(`📊 Response data size: ${JSON.stringify(data).length} characters`);
        
        if (!data.audioContent) {
            console.error('❌ No audio content in response:', data);
            throw new Error('No audio content received from Google TTS API');
        }
        
        // Convert base64 to audio
        const audioContent = data.audioContent;
        console.log(`🔊 Audio content received (${audioContent.length} characters)`);
        const audioSrc = `data:audio/mp3;base64,${audioContent}`;
        
        const audio = new Audio(audioSrc);
        
        statusIndicator.textContent = 'Speaking...';
        console.log('▶️ Playing audio...');
        
        audio.onended = function() {
            console.log('✅ Audio playback completed');
            statusIndicator.style.display = 'none';
        };
        
        audio.onerror = function(e) {
            console.error('❌ Audio playback error:', e);
            statusIndicator.textContent = 'Error playing audio';
            setTimeout(() => {
                statusIndicator.style.display = 'none';
            }, 2000);
        };
        
        audio.play();
    } catch (error) {
        console.error('❌ Error with Google TTS:', error);
        statusIndicator.textContent = 'Using browser TTS...';
        
        // Fallback to browser TTS
        console.log('🔄 Falling back to browser TTS');
        fallbackTTS(text);
    }
}

// Fallback to browser TTS if Google TTS fails
function fallbackTTS(text) {
    console.log(`🔊 Browser TTS fallback for text: "${text}"`);
    
    if ('speechSynthesis' in window) {
        console.log('✅ Browser speech synthesis is available');
        
        // Stop any ongoing speech
        if (window.speechSynthesis.speaking) {
            console.log('⏹️ Stopping ongoing speech');
            window.speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice preferences
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Slightly slower rate for ESL learners
        utterance.pitch = 1;
        
        // Show status
        const statusIndicator = document.getElementById('status-indicator');
        statusIndicator.textContent = 'Speaking (browser)...';
        statusIndicator.style.display = 'inline-block';
        
        // Log available voices
        const voices = window.speechSynthesis.getVoices();
        console.log(`📝 Available browser voices: ${voices.length}`);
        if (voices.length > 0) {
            console.log('📜 First few voices:', voices.slice(0, 3).map(v => `${v.name} (${v.lang})`));
            
            // Try to select a good voice
            const preferredVoice = voices.find(v => 
                (v.name.includes('Google') || v.name.includes('Samantha')) && 
                v.lang.includes('en-US')
            );
            
            if (preferredVoice) {
                console.log(`🎯 Selected preferred voice: ${preferredVoice.name} (${preferredVoice.lang})`);
                utterance.voice = preferredVoice;
            }
        }
        
        // Handle when speech ends
        utterance.onend = function() {
            console.log('✅ Browser speech completed');
            statusIndicator.style.display = 'none';
        };
        
        // Handle errors
        utterance.onerror = function(e) {
            console.error('❌ Browser speech error:', e);
            statusIndicator.textContent = 'Speech error!';
            setTimeout(() => {
                statusIndicator.style.display = 'none';
            }, 2000);
        };
        
        console.log('▶️ Starting browser speech');
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('❌ Browser speech synthesis is NOT available');
        // No TTS available
        const statusIndicator = document.getElementById('status-indicator');
        statusIndicator.textContent = 'Text-to-speech not available';
        setTimeout(() => {
            statusIndicator.style.display = 'none';
        }, 2000);
    }
}

// Navigation functions
function nextVerb() {
    currentVerbIndex = (currentVerbIndex + 1) % verbSets.length;
    updateFlashcards();
}

function previousVerb() {
    currentVerbIndex = (currentVerbIndex - 1 + verbSets.length) % verbSets.length;
    updateFlashcards();
}

// Fisher-Yates shuffle algorithm to randomize verbs
function shuffleVerbSets() {
    console.log("Shuffling verb sets...");
    // Make a copy of the original array
    verbSets = [...allVerbSets];
    
    // Shuffle the copy
    for (let i = verbSets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [verbSets[i], verbSets[j]] = [verbSets[j], verbSets[i]];
    }
    console.log("Verbs have been shuffled, total count:", verbSets.length);
}

// Initialize the flashcards
document.addEventListener('DOMContentLoaded', function() {
    // Randomize verb order on each page load
    shuffleVerbSets();
    updateFlashcards();
});
