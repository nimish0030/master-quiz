let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0; 
let totalQuestions = 0; 
let timer; 
let timeLeft = 30; 
const timerElement = document.getElementById("timer"); 

async function fetchQuestions() {
    try {
        console.log("Fetching questions..."); 
        const response = await fetch("http://localhost:8000/api/questions"); 

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Questions:", data); 

        if (data.length === 0) {
            throw new Error("No questions found in the database!");
        }

        questions = data; 
        totalQuestions = questions.length;
        document.getElementById("total-Question").textContent = totalQuestions;

        displayQuestion(); 
    } catch (error) {
        console.error("Error fetching questions:", error);
        document.getElementById("question-text").textContent = "Failed to load questions.";
    }
}

window.onload = fetchQuestions;



function displayQuestion() {
    if (questions.length === 0) return;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const currentQuestion = questions[currentQuestionIndex];


    questionText.textContent = currentQuestion.question;


    optionsContainer.innerHTML = "";


    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById("current-Question").textContent = currentQuestionIndex + 1;
    resetTimer(); 
}

function startTimer() {
    clearInterval(timer); 
    timeLeft = 30; 
    timerElement.textContent = timeLeft; // Display initial time

    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Moving to next question.");
            nextQuestion(); 
        } else {
            timerElement.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}


function resetTimer() {
    clearInterval(timer);
    startTimer();
}


function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswers++;
    }

    nextQuestion(); // Move to next question
}


function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        localStorage.setItem('quizScore', correctAnswers);
        localStorage.setItem('totalQuestions', totalQuestions);
        window.location.href = 'result.html'; // Redirect to results page
    }
}


window.onload = function () {
    fetchQuestions();
    startTimer();
};
