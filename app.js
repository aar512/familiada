"use strict"

//---------------------------------------------------starting view---------------------------------------------------//

let team1 = document.querySelector("#firstTeamName");
let team2 = document.querySelector("#secondTeamName");
let createButton = document.querySelector("#createTeams");
let creatingText = document.querySelector("#creatingText");

createButton.addEventListener("click", () => {
    if (team1.value === "" || team2.value === "") {
        creatingText.innerText = "Podaj nazwy drużyn";
    } else {
        document.querySelector(".table").style.display = "flex";
        document.querySelector(".teamCreating").style.display = "none";
        document.querySelector(".teams").style.display = "block";
        document.querySelector("#teamOneName").innerText = team1.value;
        document.querySelector("#teamTwoName").innerText = team2.value;
    }
});



//---------------------------------------------------functionality---------------------------------------------------//

let answers = document.querySelectorAll('[class*="ans"]');
let points = document.querySelectorAll('[class*="points"]');
let quizData;
let currentQuestionIndex = -1;

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

function ShowNextQuestion() {
    const questionData = quizData[`q${currentQuestionIndex + 1}`];
    question.innerText = questionData.question;
}

function ShowAnswer(number) {
    const questionData = quizData[`q${currentQuestionIndex + 1}`];
    answers[number].innerText = questionData.options[number];
}

function ShowPoints(number) {
    const questionData = quizData[`q${currentQuestionIndex + 1}`];
    points[number].innerText = questionData.points[number];
}


//---------------------------------------------------listeners---------------------------------------------------//


//next button
document.getElementById("next").addEventListener("click", () => {
    if (currentQuestionIndex < Object.keys(quizData).length - 1) {
        currentQuestionIndex++;
        ClearAnswers();
        ShowNextQuestion();
    }
});

//prev button
document.getElementById("prev").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        ClearAnswers();
        ShowNextQuestion();
    }
});

// slot 1
document.querySelector(".answer1").addEventListener("click", () => {
    if (answers[0].innerText !== "") {
        answers[0].innerText = "";
    } else {
        ShowAnswer(0);
    }
})

document.querySelector(".points1").addEventListener("click", () => {
    if (points[0].innerText !== "") {
        points[0].innerText = "";
    } else {
        ShowPoints(0);
    }
})

// slot 2
document.querySelector(".answer2").addEventListener("click", () => {
    if (answers[1].innerText !== "") {
        answers[1].innerText = "";
    } else {
        ShowAnswer(1);
    }
})

document.querySelector(".points2").addEventListener("click", () => {
    if (points[1].innerText !== "") {
        points[1].innerText = "";
    } else {
        ShowPoints(1);
    }
})

// slot 3
document.querySelector(".answer3").addEventListener("click", () => {
    if (answers[2].innerText !== "") {
        answers[2].innerText = "";
    } else {
        ShowAnswer(2);
    }
})

document.querySelector(".points3").addEventListener("click", () => {
    if (points[2].innerText !== "") {
        points[2].innerText = "";
    } else {
        ShowPoints(2);
    }
})

// slot 4
document.querySelector(".answer4").addEventListener("click", () => {
    if (answers[3].innerText !== "") {
        answers[3].innerText = "";
    } else {
        ShowAnswer(3);
    }
})

document.querySelector(".points4").addEventListener("click", () => {
    if (points[3].innerText !== "") {
        points[3].innerText = "";
    } else {
        ShowPoints(3);
    }
})

// slot 5
document.querySelector(".answer5").addEventListener("click", () => {
    if (answers[4].innerText !== "") {
        answers[4].innerText = "";
    } else {
        ShowAnswer(4);
    }
})

document.querySelector(".points5").addEventListener("click", () => {
    if (points[4].innerText !== "") {
        points[4].innerText = "";
    } else {
        ShowPoints(4);
    }
})