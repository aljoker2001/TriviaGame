var timer = 30;
var start = document.querySelector("#start");
var triviaField = document.createElement("div");
var startButton = document.createElement("button");
var wrapper = document.querySelector(".wrapper");
var qp = document.createElement("h2");
var questions = [
    { question: "To what house does Cho Chang belong?", answers: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"] },
    { question: "What spell turns on a light?", answers: ["Accio", "Nox", "Expecto Patronum", "Lumos"] },
    { question: "Who is Harry's giant friend?", answers: ["Firenze", "Buckbeak", "Scabbers", "Hagrid"] },
    { question: "What is the mascot of Slytherin House?", answers: ["Griffin", "Raven", "Badger", "Snake"] },
    { question: "When was Harry Potter born?", answers: ["October 31, 1980", "August 31, 1980", "May 31, 1980", "July 31, 1980"] },
    { question: "What wasn't a task in the Tri-Wizard tournament?", answers: ["Fight a dragon", "Find a friend in the Black lake", "Hedge Maze", "Win at Wizard's Chess"] }
];
var askedQuestions = [];
var timerID;
var position = Math.floor(Math.random() * questions.length);
var question = questions[position].question;
var correct = 0;
var incorrect = 0;
var tp = document.createElement("h3");
var options = [];
var rightWrong = document.querySelector("#rightWrong");
var answers;
var reset;
var playAgain = document.createElement("h3");
playAgain.setAttribute("id", "playAgain");
playAgain.textContent = "Would you like to play again?"

// Starts game with first question and timer upon pressing the "Start" button.
var startGame = () => {
    askedQuestions = [];
    tp.setAttribute("id", "timer");
    tp.textContent = `Time Remaining: ${timer}`;
    triviaField.classList.add("triviaField");
    wrapper.appendChild(triviaField);
    wrapper.removeChild(start);
    qp.classList.add("questionPara");
    qp.textContent = question;
    triviaField.appendChild(qp);
    triviaField.appendChild(tp);
    getAnswers();
    timerID = setInterval(count, 1000);
}

// Creates and posts a new question
var newQuestion = () => {
    console.log(timerID);
    clear();
    if (askedQuestions.length === 6) {
        triviaField.appendChild(playAgain);
        reset = document.getElementById("playAgain");
        reset.addEventListener("click", startGame);
        return;
    }
    position = Math.floor(Math.random() * questions.length);
    question = questions[position].question;
    if (askedQuestions.indexOf(question) === -1) {
        timer = 30;
        askedQuestions.push(question);
        qp.textContent = question;
        timerID = setInterval(count, 1000);
        getAnswers();
        console.log(question);
    } else {
        newQuestion();
    }
}

// Runs the countdown
var count = () => {
    if (timer > 0) {
        timer--;
        tp.textContent = `Time Remaining: ${timer}`;
    } else {
        wrongAnswer();
    }
}

// Puts answers for the respective question into the triviaField element
var getAnswers = () => {
    questions[position].answers.forEach((ans) => {
        options.push(ans);
        var choice = document.createElement("p");
        choice.classList.add("answers");
        choice.textContent = ans;
        triviaField.appendChild(choice);
        console.log(options);
    });
}

// Once all questions have been asked, this resets the game if they would like to play again
var startOver = () => {

}

// Displays "wrong answer" text then goes to next question after 5 seconds
var wrongAnswer = () => {
    rightWrong.textContent = `The correct answer is ${options[3]}.`;
    incorrect++;
    setTimeout(newQuestion, 5000);
}

// Checks to see if the selection is the correct answer
var isAnswer = function () {
    if (this.textContent === questions[position].answers[3]) {
        rightWrong.textContent = "That is correct!";
    } else {
        wrongAnswer();
    }
}

// clears out old answers, resets timer, and clears the timerID interval
var clear = () => {
    timer = 30;
    options = [];
    clearInterval(timerID);
    answers = document.getElementsByClassName("answers");
    for (i = 0; i < answers.length; i++) {
        triviaField.removeChild(answers[i]);
    }
}

start.addEventListener("click", startGame);
options.forEach(function (elem) {
    elem.addEventListener("click", isAnswer);
});