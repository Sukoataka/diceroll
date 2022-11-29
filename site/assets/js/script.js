"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    const playButton = document.querySelector("#play");
    const highScoresButton = document.querySelector("#highScores");

    playButton.addEventListener("click", play);
    highScoresButton.addEventListener("click", showHighScores);
}

function play(){
    location.href = "../pages/waitingscreen.html";
}

function showHighScores(){
    location.href = "../pages/highscores.html";
}