// Application state
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let correctAnswers = [];

// DOM elements
const lineAElement = document.getElementById('lineA');
const lineBElement = document.getElementById('lineB');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const finalScoreElement = document.getElementById('finalScore');
const questionContainer = document.getElementById('questionContainer');
const completionContainer = document.getElementById('completionContainer');
const restartBtn = document.getElementById('restartBtn');
const playLineABtn = document.getElementById('playLineA');
const playLineBBtn = document.getElementById('playLineB');

// Initialize the application
function initApp() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = new Array(practiceData.length).fill(false);
    loadQuestion(currentQuestionIndex);
    updateProgress();
    
    // Event listeners
    nextBtn.addEventListener('click', goToNextQuestion);
    restartBtn.addEventListener('click', restartPractice);
    
    // TTS play buttons
    playLineABtn.addEventListener('click', () => {
        const text = practiceData[currentQuestionIndex].lineA;
        tts.speakLine(text);
    });
    
    playLineBBtn.addEventListener('click', () => {
        const text = practiceData[currentQuestionIndex].lineB;
        tts.speakLine(text);
    });
}

// Load a question based on index
function loadQuestion(index) {
    const question = practiceData[index];
    
    // Reset state
    selectedOption = null;
    nextBtn.classList.remove('visible');
    
    // Clear existing options
    optionsContainer.innerHTML = '';
    
    // Process line A
    if (question.lineA.includes('{{blank}}')) {
        lineAElement.innerHTML = tts.processLineWithBlank(question.lineA);
    } else {
        lineAElement.innerHTML = tts.processTextToInteractive(question.lineA);
    }
    
    // Process line B
    if (question.lineB.includes('{{blank}}')) {
        lineBElement.innerHTML = tts.processLineWithBlank(question.lineB);
    } else {
        lineBElement.innerHTML = tts.processTextToInteractive(question.lineB);
    }
    
    // Create option buttons
    question.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.classList.add('option-btn');
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectOption(option));
        
        // Add TTS functionality to option buttons
        optionBtn.addEventListener('mouseover', () => {
            optionBtn.setAttribute('title', `Listen to "${option}"`);
        });
        optionBtn.addEventListener('dblclick', () => {
            tts.speak(option);
        });
        
        optionsContainer.appendChild(optionBtn);
    });
}

// Handle option selection
function selectOption(option) {
    const question = practiceData[currentQuestionIndex];
    const answerBlank = document.getElementById('answerBlank');
    
    // Store selected option for TTS playback
    selectedOption = option;
    
    // Clear previous selection
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Set new selection
    const selectedBtn = Array.from(optionBtns).find(btn => btn.textContent === option);
    selectedBtn.classList.add('selected');
    
    // Update blank with selected option
    answerBlank.textContent = option;
    answerBlank.onclick = () => tts.speak(option);
    
    // Check if correct
    if (option === question.correct) {
        answerBlank.className = 'answer-blank correct';
        nextBtn.classList.add('visible');
        
        // Update score if first time correct
        if (!correctAnswers[currentQuestionIndex]) {
            score++;
            correctAnswers[currentQuestionIndex] = true;
        }
    } else {
        answerBlank.className = 'answer-blank incorrect';
        // Provide audio feedback for incorrect answer
        setTimeout(() => tts.speak(option), 100);
    }
}

// Go to next question
function goToNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < practiceData.length) {
        loadQuestion(currentQuestionIndex);
        updateProgress();
    } else {
        showCompletion();
    }
}

// Update progress indicators
function updateProgress() {
    const progress = ((currentQuestionIndex) / practiceData.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1}/${practiceData.length}`;
}

// Show completion screen
function showCompletion() {
    questionContainer.style.display = 'none';
    nextBtn.classList.remove('visible');
    document.querySelector('.action-container').style.display = 'none';
    completionContainer.style.display = 'block';
    finalScoreElement.textContent = score;
    
    // Speak congratulations
    tts.speak(`Congratulations! Your score is ${score} out of ${practiceData.length}.`);
}

// Restart practice
function restartPractice() {
    questionContainer.style.display = 'block';
    document.querySelector('.action-container').style.display = 'flex';
    completionContainer.style.display = 'none';
    initApp();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initApp);
