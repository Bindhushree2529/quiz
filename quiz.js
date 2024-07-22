const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Madrid', 'Paris', 'Berlin', 'Rome'],
        answer: 'Paris'
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Leo Tolstoy'],
        answer: 'William Shakespeare'
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Jupiter', 'Saturn', 'Mars'],
        answer: 'Jupiter'
    }
];

const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (userAnswer === correctAnswer) {
        score++;
        resultElement.textContent = 'Correct!';
    } else {
        resultElement.textContent = `Incorrect. The correct answer is "${correctAnswer}".`;
    }
    nextButton.disabled = false;
    disableOptions();
}

function disableOptions() {
    const optionButtons = optionsElement.getElementsByTagName('button');
    for (let button of optionButtons) {
        button.disabled = true;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    resultElement.textContent = '';
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.disabled = true;
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    quizContainer.innerHTML = `<h2>Quiz completed!</h2><p>Your score: ${score} out of ${quizData.length}</p>`;
    resultElement.textContent = '';
    nextButton.style.display = 'none';
}

nextButton.addEventListener('click', nextQuestion);

// Load first question
loadQuestion();
