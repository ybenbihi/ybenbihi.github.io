const body = document.querySelector("body");
const overlay = document.querySelector("#overlay");
const menuButton = document.querySelector("#menu-button");
const header = document.querySelector("header");
const main = document.querySelector("main");
const colorBoxesContainer = document.querySelector("#color-boxes");
var resultBox = document.querySelector("#result-box");
var difficulty = "easy";
var game;
const sliders = {
    range1: document.querySelector("#range-1"),
    range2: document.querySelector("#range-2"),
    range3: document.querySelector("#range-3")
};
function newGame() {
    game = new Game(difficulty, colorBoxesContainer, {
        red: sliders.range1,
        green: sliders.range2,
        blue: sliders.range3
    });
    resultBox = document.querySelector("#result-box");
}
/* Update the result box when ever there is a change in the slider */ document.querySelectorAll(".slider").forEach((slider)=>{
    slider.addEventListener("input", ()=>{
        let color = game.computeResultColor(hex = true);
        resultBox.style.backgroundColor = color;
    });
});
function changeDifficulty(newDifficulty) {
    header.classList.remove("opened");
    setTimeout(()=>{
        document.querySelectorAll(".difficulty").forEach((difficulty)=>difficulty.classList.remove("selected"));
        document.querySelector("#difficulty-" + newDifficulty).classList.add("selected");
    }, 300);
    difficulty = newDifficulty;
    newGame();
}
function checkScore() {
    let score = game.computeScore();
    let scoreText = document.querySelector("#overlay h1");
    let scoreValue = document.querySelector("#overlay h3");
    let resultColorBox = document.querySelector("#result-color");
    let targetColorBox = document.querySelector("#target-color");
    resultColorBox.style.backgroundColor = game.computeResultColor();
    targetColorBox.style.backgroundColor = game.getTargetColor();
    if (score == 0) scoreText.innerText = "Colorblind ?";
    else if (score <= 30) scoreText.innerText = "No comment...";
    else if (score <= 50) scoreText.innerText = "You can do better...";
    else if (score <= 60) scoreText.innerText = "Good enough";
    else if (score <= 70) scoreText.innerText = "Nice";
    else if (score <= 90) scoreText.innerText = "Impressive !";
    else if (score < 100) scoreText.innerText = "Almost there !";
    else scoreText.innerText = "PER-FECT !";
    scoreValue.innerText = "Score : " + score + "%";
    overlay.classList.toggle("active");
    setTimeout(()=>{
        newGame();
        overlay.classList.toggle("active");
    }, 1500);
}
newGame();

//# sourceMappingURL=index.c3839b43.js.map
