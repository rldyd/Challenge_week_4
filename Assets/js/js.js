//set question array
var questions =
    [
        {
            q: "Who invented JavaScript?",
            c: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich"],
            a: "Brendan Eich",
        },
        {
            q: "which one of these is a JavaScript package manger?",
            c: ["Node.js", "TypeScript", "npm"],
            a: "npm",
        },
        {
            q: "Among these which variable type is volatile?",
            c: ["Static variable", "Mutable variable", "Dynamic variable"],
            a: "Mutalbe variable",
        },
        {
            q: "Which is NOT a property of /attribute behaviour of &lt;Marquee>Tag?",
            c: ["Blur", "Scroll", "Alternate"],
            a: "Alternate",
        },
        {
            q: "Which built-in method combines the text of two strings and returns a new string",
            c: ["append()", "concat()", "attach()"],
            a: "concat()",
        },
    ];

var mainElement = document.getElementById("mainHome");
var startButton = document.getElementById("startButton");
var playAgainButton = document.getElementById("playAgainButton");
var homeButtion = document.getElementById("homeButton");
var timeElement = document.getElementById("timer");
var gameElement = document.getElementById("gameDiv");
var playAgainElement = document.getElementById("playAgain");
var resultElement = document.getElementById("result");
var displayScoreElement = document.getElementById("displayScore");
var displayQuestionEl = document.getElementById("gameQueston");
var displayChoiceEl = document.getElementById("gameChoice");

// new variables
var numQuestion = questions.length;
var totalQuestions;
var currentQuestion = questions[totalQuestions];
var correctAnswer;

startButton.addEventListener('click', function (event) {
    //console.log(event);
    startQuiz();
});

function emptyQuestions() {
    gameElement.innerHTML = "";
};

function startQuiz() {
    quizTimer();
    mainElement.style.display = "none";
    playAgainElement.style.display = "none";
    gameElement.style.display = "block";
    totalQuestions = 0;
    correctAnswer = 0;
    showQuestions();
};

function quizTimer() {
    var timeLeft = 20;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1 || timeLeft === 1) {
            timeElement.textContent = timeLeft;
            timeLeft--;
        }
        else {
            timeElement.textContent = "";
            clearInterval(timeInterval);
            endGame();
        }
    }, 1000);
};

function showQuestions()
{
    emptyQuestions();
    currentQuestion = questions[totalQuestions];
    //console.log(currentQuestion);
    var newTotalQuestions = totalQuestions+1;
    displayQuestionEl.textContent = "Question " + newTotalQuestions + " out of " + numQuestion;
    var newQuestionEl = document.createElement("h2");
    //console.log(newQuestionEl);
    newQuestionEl.textContent = currentQuestion.q;
    gameElement.appendChild(newQuestionEl);
    displayQuestionChoice();
};

function displayQuestionChoice()
{
    for (var i=0; i<currentQuestion.c.length; i++)
    {
        var newChoiceEl = document.createElement("button");
        newChoiceEl.setAttribute("class", "choice-style");
        newChoiceEl.setAttribute("data-value", currentQuestion.c[i]);
        newChoiceEl.textContent = currentQuestion.c[i];
        gameElement.appendChild(newChoiceEl);
        console.log(newChoiceEl);
    }
};

function compareAnswer(selectAnswer)
{
    if (selectAnswer === currentQuestion.a)
    {
        correctAnswer++;
        totalQuestions++;
        playAgain();
    }
    else 
    {
        totalQuestions++;
        playAgain();
    }
};

function playAgain()
{
    if (totalQuestions === numQuestion)
    {
        gameEnd();
    }
    else
    {
        showQuestions();
    }
};

function gameEnd()
{
    gameElement.style.display = "none";
    resultElement.style.display = "flex";
    timeElement.textContent = "20";
    displayScoreElement.textContent = "Your score is " + correctAnswer + " out of " + numQuestion;
};

gameElement.addEventListener('click', function(event)
{
    //console.log("adsfasdfgasdf");
    //console.log(event);
    event.preventDefault();
    //console.log("ADSFASDFASDFQWEFQWF");
    if(event.target.matches("button"))
    {
        var selectAnswer = event.target.getAttribute("data-value");
        compareAnswer(selectAnswer);
    }
});

