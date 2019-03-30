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
var position;
var question;
var correct = 0;
var incorrect = 0;
var tp = document.createElement("h3");
var options = [];
var shuffledOptions = [];
var rightWrong;
var answers = [];
var reset;
var playAgain;

// Starts game with first question and timer upon pressing the "Start" button.
var startGame = () => {
    position = Math.floor(Math.random() * questions.length);
    question = questions[position].question;
    askedQuestions.push(question);
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
    // console.log(timerID);
    clearInterval(timerID);
    clear();
    // Gives option to play again once all questions are asked
    if (askedQuestions.length === questions.length) {
        playAgain = document.createElement("h3");
        playAgain.setAttribute("id", "playAgain");
        playAgain.textContent = "Would you like to play again?"
        triviaField.appendChild(playAgain);
        reset = document.getElementById("playAgain");
        reset.addEventListener("click", startOver);
        return;
    }
    position = Math.floor(Math.random() * questions.length);
    question = questions[position].question;
    // Displays a new question and resets the timer
    if (askedQuestions.indexOf(question) === -1) {
        timer = 30;
        tp.textContent = `Time Remaining: ${timer}`;
        askedQuestions.push(question);
        qp.textContent = question;
        getAnswers();
        timerID = setInterval(count, 1000);
        console.log(question);
    // Gets a new question if the randomly selected question has already been asked
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
    });
    shuffledOptions = [];
    shuffle(options);
    shuffledOptions.forEach((shuf) => {
        var choice = document.createElement("p");
        choice.classList.add("answers");
        choice.textContent = shuf;
        triviaField.appendChild(choice);
        console.log(options);
    });
    answers = document.getElementsByClassName("answers")
    for (j = 0; j < answers.length; j++) {
        answers[j].addEventListener("click", isAnswer);
    }
}

// Once all questions have been asked, this resets the game if they would like to play again
var startOver = () => {
    wrapper.removeChild(playAgain);
    askedQuestions = [];
    startGame();
}

// Displays "wrong answer" text then goes to next question after 5 seconds
var wrongAnswer = () => {
    clearInterval(timerID);
    rightWrong = document.createElement("h2");
    rightWrong.setAttribute("id", "rightWrong");
    rightWrong.textContent = `The correct answer is ${options[3]}.`;
    triviaField.appendChild(rightWrong);
    incorrect++;
    clearInterval(timerID);
    setTimeout(newQuestion, 3000);
}

// Checks to see if the selection is the correct answer
var isAnswer = function () {
    clearInterval(timerID);
    if (this.textContent === questions[position].answers[3]) {
        rightWrong = document.createElement("h2");
        rightWrong.setAttribute("id", "rightWrong");
        rightWrong.textContent = "That is correct!";
        triviaField.appendChild(rightWrong);
        correct++;
        clearInterval(timerID);
        setTimeout(newQuestion, 3000);
    } else {
        wrongAnswer();
    }
}

// clears out old answers, resets timer, and clears the timerID interval
var clear = () => {
    clearInterval(timerID);
    timer = 30;
    options = [];
    for (i = 0; i < 4; i++) {
        var b = answers.length - 1;
        triviaField.removeChild(answers[b]);
    }
    triviaField.removeChild(rightWrong);
}

// Shuffles the order of the answers so the correct answer isn't always the bottom right option
function shuffle(arra1) {
    let random = Math.floor(Math.random() * arra1.length);
    if (shuffledOptions.length === arra1.length) {
        return shuffledOptions;
    } else if (shuffledOptions.indexOf(arra1[random]) !== -1) {
        shuffle(arra1);
    } else {
        shuffledOptions.push(arra1[random]);
        shuffle(arra1);
    }
}

start.addEventListener("click", startGame);