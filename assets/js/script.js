// Global variables
var startButton = document.querySelector(".start-button");
var timerCount = document.querySelector("#timer-count");
var question = document.querySelector("#question");
var choices = document.querySelector("#choices");
var choice1 = document.querySelector("#choiceA");
var choice2 = document.querySelector("#choiceB");
var choice3 = document.querySelector("#choiceC");
var choice4 = document.querySelector("#choiceD");
var intro = document.querySelector("#intro");
var start = document.querySelector("#start");
var inputScores = document.querySelector("#input-scores");
var scoreDisplay = document.querySelector("#score-display");
var highScore = document.querySelector("#high-scores");
var restart = document.querySelector("restart");
var userInitials = document.querySelector("#input-initials");
var yourScore = document.querySelector("#your-score");

// question, choice, and answer object
var questions = [
  {
    title: "What tag is used to bold a line of text?",
    multiChoice: ["<strong>", "<sub>", "<mark>", "<em>"],
    answer: "<strong>"
  },

  {
    title: "What is the name of the group of properties that allows you to control the height and width of elements?",
    multiChoice: ["box", "size", "block", "flex"],
    answer: "block"
  },

  {
    title: "What is the method to convert 'boolean' to a string value?",
    multiChoice: ["boolean.JSON()", "boolean.toString()", "boolean.valueOf()", "Cannot be done"],
    answer: "boolean.toString()"
  },

  {
    title: "Which  below line is an example of the correct shorthand for writing the border properties?",
    multiChoice: ["p{border: 5px, solid, red}", "p{border: solid, 5px, red}", "p{border: 5px, red, solid}", "p{5px: red, solid, 5px}"],
    answer: "p{border: 5px, solid, red}"
  },

  {
    title: "Inside which HTML element would we put javascript code?",
    multiChoice: ["<js>", "<javascript>", "<java>", "<script>"],
    answer: "<script>"
  }
];

console.log(questions[0].title)
console.log(Object.keys(questions).length);

// more variables
var totalQuestions = Object.keys(questions).length;
var questionCount = 0;
score = 0;
var timerInterval;
var secondsLeft = 60;
var timerInterval;

// hide currently unused displays
start.style.display = "none";
inputScores.style.display = "none";
highScore.style.display = "none";

// this function set then pulls input initials from local storage and applies a boundry condition not allowing blank input 
function highScores() {
  var userInput = document.getElementById("input-initials").value;
  localStorage.setItem("initials", JSON.stringify(userInput));
  localStorage.setItem("score", JSON.stringify(score));
  if (userInput === "") {
    alert("Must enter initials");
    return;
  } else
    var userInitials = localStorage.getItem("initials");
    var userScore = localStorage.getItem("score");
    yourScore.textContent = "Initials: " + userInitials + " Score: " + userScore
    inputScores.style.display = "none";
    highScore.style.display = "block";
}

// this function displays your final score as well as ends game
// and clears time when triggered
function displayScore() {
  inputScores.style.display = "block";
  start.style.display = "none";
  timerCount.textContent = "Game Over!"
  clearInterval(timerInterval);
  scoreDisplay.textContent = "You scored " + score + " of 5 correct!"
}

// This cycles through the question object and displays them
function generateQuestion() {
  start.style.display = "block"
  intro.style.display = "none"
  question.textContent = questions[questionCount].title;
  choice1.textContent = questions[questionCount].multiChoice[0];
  choice2.textContent = questions[questionCount].multiChoice[1];
  choice3.textContent = questions[questionCount].multiChoice[2];
  choice4.textContent = questions[questionCount].multiChoice[3];
}

// This resets parameters to start a new game
function tryAgain() {
  intro.style.display = "block";
  highScore.style.display = "none";
  secondsLeft = 60;
  score = 0;
  questionCount = 0;
}

// This checks if the input answers are correct as well as adds score to correct
// answers and removes time for incorrect ones
function checkAnswer(answer) {
  var correct = questions[questionCount].answer;
  if (answer === correct && questionCount !== (questions.length - 1)) {
    score++;
    questionCount++;
    alert("Correct!");
    generateQuestion();
  } else if (answer !== correct && questionCount !== (questions.length - 1)) {
    questionCount++;
    secondsLeft = secondsLeft - 10;
    alert("Incorrect!");
    generateQuestion();
  } else if (answer === correct && questionCount === (questions.length - 1)) {
    score++;
    alert("Correct!");
    console.log(score);
    displayScore();
  } else if (answer !== correct && questionCount === (questions.length - 1)) {
    alert("Incorrect!");
    console.log(score);
    displayScore();
  }
}

// This starts timer countdown
function setTime(){
  generateQuestion();
  timerInterval = setInterval(function() {
      secondsLeft--;
      timerCount.textContent = secondsLeft;
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        displayScore();
      }
    }, 1000);
}


startButton.addEventListener("click", setTime);
console.log(questions[questionCount].multiChoice.length);
