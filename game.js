const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    { 
        // JavaScript - Logical Comparison
        question: "What does the strict equality comparison operator (===) compare?",
        choice1: "Value Only",
        choice2: "Value and Type",
        choice3: "Type Only",
        choice4: "Numbers Only",
        answer: "Value and Type",
    },
    {
        // JavaScript - Logical Operator
        question: "Which of the following is NOT a logical operator?",
        choice1: "&&",
        choice2: "!!",
        choice3: "&|",
        choice4: "||",
        answer: "&|",
    },

    {
        // JavaScript - HTML
        question: "What do we use to dynamically manipulate the HTML elements on a page?",
        choice1: "The DIM",
        choice2: "The DEM",
        choice3: "The DOM",
        choice4: "The DMM",
        answer: "The DOM",
    }, 

    {
        //JavaScript - Primitive Types
        question: "Which of the following are primitive data types?",
        choice1: "Strings",
        choice2: "Number",
        choice3: "Undefined",
        choice4: "All of the above",
        answer: "All of the above",
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()