var timer = 20;
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
    { question: "What wasn't a task in the Tri-Wizard tournament?", answers: ["Fight a dragon", "Find a friend in the Black lake", "Hedge Maze", "Win at Wizard's Chess"] },
    { question: "What is Harry Potter's patronus charm?", answers: ["Hare", "Penguin", "Otter", "Stag"] },
    { question: "Who did not teach Defense against the Dark Arts?", answers: ["Severus Snape", "Albus Dumbledore", "Remus Lupin", "Alastor Moody"] },
    { question: "Who of the following is not an Animagus?", answers: ["Minerva McGonagall", "Sirius Black", "Peter Pettigrew", "Sybill Trelawney"]},
    { question: "What was the name of Albus Dumbledore's sister?", answers: ["Aliana", "Athiana", "Astrina", "Ariana"]}
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
var correctField;
var incorrectField;
var playAgain;
var t = [1, 2, 3, 5, 6]

// Starts game with first question and timer upon pressing the "Start" button.
var startGame = () => {
    position = Math.floor(Math.random() * questions.length);
    question = questions[position].question;
    askedQuestions.push(question);
    tp.setAttribute("id", "timer");
    tp.textContent = `Time Remaining: ${timer}`;
    triviaField.classList.add("triviaField");
    wrapper.appendChild(triviaField);
    if (shuffledOptions.length === 0) {
        wrapper.removeChild(start);
    }
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
    // Gives option to play again once all questions are asked
    if (askedQuestions.length === questions.length) {
        clear();
        askedQuestions = [];
        triviaField.removeChild(rightWrong);
        correctField = document.createElement("h2")
        correctField.textContent = `Correct: ${correct}`;
        correctField.setAttribute("class", "totals");
        triviaField.appendChild(correctField);
        incorrectField = document.createElement("h2")
        incorrectField.textContent = `Incorrect: ${incorrect}`;
        incorrectField.setAttribute("class", "totals");
        triviaField.appendChild(incorrectField);
        playAgain = document.createElement("h3");
        playAgain.setAttribute("id", "playAgain");
        playAgain.textContent = "Click to play again"
        triviaField.appendChild(playAgain);
        reset = document.getElementById("playAgain");
        reset.addEventListener("click", startOver);
        return;
    }
    position = Math.floor(Math.random() * questions.length);
    question = questions[position].question;
    getAnswers();
    // Displays a new question and resets the timer
    if (askedQuestions.indexOf(question) === -1) {
        timer = 20;
        tp.textContent = `Time Remaining: ${timer}`;
        askedQuestions.push(question);
        qp.textContent = question;
        timerID = setInterval(count, 1000);
        console.log(question);
        // Gets a new question if the randomly selected question has already been asked
    } else {
        clear();
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
    if (options.length !== 0) {
        clear();
    }
    if (triviaField.childNodes.length > 2 && askedQuestions.length !== questions.length) {
        triviaField.removeChild(rightWrong);
    }
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
    triviaField.removeChild(playAgain);
    triviaField.removeChild(correctField);
    triviaField.removeChild(incorrectField);
    // askedQuestions = [];
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
    timer = 20;
    options = [];
    for (i = 0; i < 4; i++) {
        var b = answers.length - 1;
        var alist = Object.values(triviaField.childNodes);
        if (alist.indexOf(answers[b])) {
            triviaField.removeChild(answers[b]);
        } else {
            console.log(triviaField.childNodes);
        }
    }
    // triviaField.removeChild(rightWrong);
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