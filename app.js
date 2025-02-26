"use strict"

//---------------------------------------------------starting view---------------------------------------------------//

let team1 = document.querySelector("#firstTeamName");
let team2 = document.querySelector("#secondTeamName");
let createButton = document.querySelector("#createTeams");
let creatingText = document.querySelector("#creatingText");

document.querySelector("#prev").style.display = "none";
document.querySelector("#next").style.display = "none";
document.querySelector("#startBlue").style.display = "none";
document.querySelector("#startRed").style.display = "none";
document.querySelector("#teamChange").style.display = "none";

createButton.addEventListener("click", () => {
    if (team1.value === "" || team2.value === "") {
        creatingText.innerText = "Podaj nazwy drużyn";
    } else {
        document.querySelector(".table").style.display = "flex";
        document.querySelector(".teamCreating").style.display = "none";
        document.querySelector(".teams").style.display = "block";
        document.querySelector("#teamOneName").innerText = team1.value + '  ' + teamPoints.blue;
        document.querySelector("#teamTwoName").innerText = team2.value + '  ' + teamPoints.red;
        document.querySelector("#prev").style.display = "block";
        document.querySelector("#next").style.display = "block";
        document.querySelector("#startBlue").style.display = "block";
        document.querySelector("#startRed").style.display = "block";
    }
});

//---------------------------------------------------functionality---------------------------------------------------//

let answers = document.querySelectorAll('[class*="ans"]');
let points = document.querySelectorAll('[class*="points"]');
let quizData;
let currentQuestionIndex = -1;
let currentTeam = "";
let teamPoints = {
    blue: 0,
    red: 0
};
let roundPoints = 0;
let pointsAdded = [false, false, false, false, false]
let teamOneName = document.querySelector("#teamOneName");
let teamTwoName = document.querySelector("#teamTwoName");

fetch("answers.json")
    .then(response => response.json())
    .then(data => {
        quizData = data.quiz.harcerka;
    })

function ClearAnswers() {
    answers.forEach(answerElement => {
        answerElement.innerText = "";
    });
    points.forEach(pointElement => {
        pointElement.innerText = "";
    });
}

function clearClasses(...elements) {
    elements.forEach(element => {
        element.classList.remove("text-hide");
        element.classList.remove("text-reveal");
    });
}

function ShowNextQuestion() {
    const questionData = quizData[`q${currentQuestionIndex + 1}`];
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = '';

    questionData.question.split('').forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.visibility = 'hidden';
        questionElement.appendChild(span);
    });

    let index = 0;
    const interval = setInterval(() => {
        if (index < questionElement.children.length) {
            questionElement.children[index].style.visibility = 'visible';
            index++;
        } else {
            clearInterval(interval);
        }
    }, 25);
}

function ShowAnswer(number) {
    const questionData = quizData[`q${currentQuestionIndex + 1}`];
    answers[number].innerText = questionData.options[number];
    answers[number].classList.remove("text-hide");
    answers[number].classList.add("text-reveal");
}

function hideAnswer(number) {
    answers[number].classList.remove("text-reveal");
    answers[number].classList.add("text-hide");

    answers[number].addEventListener("animationend", () => {
        answers[number].innerText = "";
        answers[number].classList.remove("text-hide");
    }, { once: true });
}

function changeTeam() {
    if (currentTeam === "blue") {
        currentTeam = "red";
        teamOneName.style.textDecoration = "none";
        teamTwoName.style.textDecoration = "underline";
        teamTwoName.style.textDecorationThickness = "7px";
    } else {
        currentTeam = "blue";
        teamOneName.style.textDecoration = "underline";
        teamTwoName.style.textDecoration = "none";
        teamOneName.style.textDecorationThickness = "7px";
    }
    console.log(currentTeam);
}

function ShowPoints(number) {
    const questionData = quizData[`q${currentQuestionIndex + 1}`];
    const targetPoints = parseInt(questionData.points[number], 10);
    let currentPoints = 0;

    const interval = setInterval(() => {
        if (currentPoints <= targetPoints) {
            points[number].innerText = currentPoints;
            currentPoints++;
        } else {
            clearInterval(interval);
            if (pointsAdded[number] === false) {
                roundPoints += targetPoints;
                console.log(`Round points: ${roundPoints}`);
                teamPoints[currentTeam] += targetPoints;
                console.log(`Team ${currentTeam} points: ${teamPoints[currentTeam]}`);
                pointsAdded[number] = true;

                document.querySelector("#teamOneName").innerText = team1.value + '  ' + teamPoints.blue;
                document.querySelector("#teamTwoName").innerText = team2.value + '  ' + teamPoints.red;
            } else {
                console.log("Points already added");
            }
        }
    }, 50);
}

function hidePoints(number) {
    let currentPoints = parseInt(points[number].innerText, 10);

    const interval = setInterval(() => {
        if (currentPoints > 0) {
            points[number].innerText = currentPoints;
            currentPoints--;
        } else {
            points[number].innerText = "";
            clearInterval(interval);
        }
    }, 50);
}

//---------------------------------------------------listeners---------------------------------------------------//

//next button
document.getElementById("next").addEventListener("click", () => {
    if (currentQuestionIndex < Object.keys(quizData).length - 1) {
        currentQuestionIndex++;
        ClearAnswers();
        ShowNextQuestion();
        clearClasses(...answers);
        pointsAdded = [false, false, false, false, false];
        roundPoints = 0;
    }
});

//prev button
document.getElementById("prev").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        ClearAnswers();
        ShowNextQuestion();
        clearClasses(...answers);
        pointsAdded = [false, false, false, false, false];
        roundPoints = 0;
    }
});

// slot 1
document.querySelector(".answer1").addEventListener("click", () => {
    if (answers[0].innerText !== "") {
        hideAnswer(0);
    } else {
        ShowAnswer(0);
    }
})

document.querySelector(".points1").addEventListener("click", () => {
    if (points[0].innerText !== "") {
        hidePoints(0);
    } else {
        ShowPoints(0);
    }
})

// slot 2
document.querySelector(".answer2").addEventListener("click", () => {
    if (answers[1].innerText !== "") {
        hideAnswer(1);
    } else {
        ShowAnswer(1);
    }
})

document.querySelector(".points2").addEventListener("click", () => {
    if (points[1].innerText !== "") {
        hidePoints(1);
    } else {
        ShowPoints(1);
    }
})

// slot 3
document.querySelector(".answer3").addEventListener("click", () => {
    if (answers[2].innerText !== "") {
        hideAnswer(2);
    } else {
        ShowAnswer(2);
    }
})

document.querySelector(".points3").addEventListener("click", () => {
    if (points[2].innerText !== "") {
        hidePoints(2);
    } else {
        ShowPoints(2);
    }
})

// slot 4
document.querySelector(".answer4").addEventListener("click", () => {
    if (answers[3].innerText !== "") {
        hideAnswer(3);
    } else {
        ShowAnswer(3);
    }
})

document.querySelector(".points4").addEventListener("click", () => {
    if (points[3].innerText !== "") {
        hidePoints(3);
    } else {
        ShowPoints(3);
    }
})

// slot 5
document.querySelector(".answer5").addEventListener("click", () => {
    if (answers[4].innerText !== "") {
        hideAnswer(4);
    } else {
        ShowAnswer(4);
    }
})

document.querySelector(".points5").addEventListener("click", () => {
    if (points[4].innerText !== "") {
        hidePoints(4);
    } else {
        ShowPoints(4);
    }
})

document.querySelector("#startBlue").addEventListener("click", () => {
    document.querySelector("#teamChange").style.display = "block";
    document.querySelector("#startBlue").style.display = "none";
    document.querySelector("#startRed").style.display = "none";
    document.body.style.backgroundColor = "rgb(10, 60, 0, 1.1)";
    currentTeam = "red"; //amatorka bo sie wybieralo na odwrot
    changeTeam();
})

document.querySelector("#startRed").addEventListener("click", () => {
    document.querySelector("#teamChange").style.display = "block";
    document.querySelector("#startBlue").style.display = "none";
    document.querySelector("#startRed").style.display = "none";
    document.body.style.backgroundColor = "rgb(10, 60, 0, 1.1)";
    currentTeam = "blue"; //amatorka bo sie wybieralo na odwrot
    changeTeam();
})

document.querySelector("#teamChange").addEventListener("click", () => {
    changeTeam();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "n") {
        currentTeam = null
        document.body.style.backgroundColor = "gray";
        teamOneName.style.textDecoration = "none";
        teamTwoName.style.textDecoration = "none";
        document.querySelector("#startBlue").style.display = "block";
        document.querySelector("#startRed").style.display = "block";
        document.querySelector("#teamChange").style.display = "none";
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "b") {
        teamPoints[currentTeam] += roundPoints;
        if (currentTeam == "blue") {
            teamPoints.blue += roundPoints;
        } else if (currentTeam == "red") {
            teamPoints.red += roundPoints;
        }
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "x") {
        if (currentTeam == "blue") {
            document.getElementById("teamOneMistakes").innerHTML += "&#10008";
        } else if (currentTeam == "red") {
            document.getElementById("teamTwoMistakes").innerHTML += "&#10008";
        }
    }
});