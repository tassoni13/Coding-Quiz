//Quiz questions and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/ bash", "for loops", "console log"],
        answer: "console log"
    }
];

//Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var quiz = document.querySelector("#quiz");
var wrapper = document.querySelector("#wrapper");

//Starting score
var score = 0;
//Starts quiz with first question
var questionIndex = 0;
//Starts quiz with 75 seconds on timer
var secondsLeft = 75;
//Holds interval time
var holdInterval = 0;
//Holds penalty time
var penalty = 10;
//Creates new element for quiz questions and choices
var ulCreate = document.createElement("ul");

//Listents for click on start button, begins the quiz timer when clicked
timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Renders quiz questions and choices
function render(questionIndex) {
    //Clears existing data
    quiz.innerHTML = "";
    ulCreate.innerHTML = "";
    //For loop to loop through questions and choices
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        quiz.textContent = userQuestion;
    }
    //New forEach for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quiz.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//Compares choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", createDiv);
        //Correct condition
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        //Incorrect condition
        } else {
            //Will deduct 10 seconds from secondsLeft for wrong answer
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
        }
    }
    //Question index determines number of question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        //All done will append last page with users score
        allDone();
        createDiv.textContent = "Finished!" + " " + "You got " + score + "/" + questions.length + " correct!";
    }else {
        render(questionIndex);
    }
    quiz.appendChild(createDiv);
}

//All done will append last page
function allDone() {
    quiz.innerHTML = "";
    currentTime.innerHTML = "";

    //Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    quiz.appendChild(createH1);

    //Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quiz.appendChild(createP);

    //Calulates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quiz.appendChild(createP2);
    }
    //Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quiz.appendChild(createLabel);

    //Input initials 
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initals");
    createInput.textContent = "";

    quiz.appendChild(createInput);

    //Submit initials
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    quiz.appendChild(createSubmit);

    //Event listener to sumbmit initials and store with score in local storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === "") {
            alert("Please enter initals!")
            return false;

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            //Navigates to high scores page
            window.location.replace("./HighScores.html");
        }
    })
}


