const games = [
{
title: "Minecraft",
emoji: "⛏️",
description: "Build, explore, and survive in a blocky pixel world.",
clue: "You punch trees and craft tools in a world made of blocks."
},
{
title: "Donkey Kong",
emoji: "🦍",
description: "Classic arcade adventure with barrels and a giant ape.",
clue: "Jump over barrels thrown by a big gorilla to rescue the lady."
},
{
title: "Space Invaders",
emoji: "👾",
description: "Defend Space from waves of descending pixel aliens.",
clue: "Shoot the rows of aliens before they reach the bottom of the screen."
},
{
title: "GTA",
emoji: "🚗",
description: "Open-world crime and chaos in a pixel city.",
clue: "Steal cars and cause mayhem in a big open city."
},
{
title: "Fortnite",
emoji: "🔫",
description: "Build forts and battle in a colorful free-for-all.",
clue: "Build structures and be the last one standing on an island."
},
{
title: "Papa's Pizzeria",
emoji: "🍕",
description: "Take orders and bake perfect pizzas for hungry customers.",
clue: "You run a pizza shop and must cook the right toppings for customers."
}
];

let currentGame = null;
let attemptsLeft = 3;
let timeLeft = 30;
let timerInterval = null;
let gameActive = false;

const gamesGrid = document.getElementById("gamesGrid");
const clueDisplay = document.getElementById("clueDisplay");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attemptsLeft");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

function renderGameCards() {
gamesGrid.innerHTML = "";

// Show ALL games in the Featured section
games.forEach(game => {
const card = document.createElement("div");
card.className = "game-card";
card.innerHTML = `
<div class="game-art">${game.emoji}</div>
<div class="game-info">
<h3 class="game-title">${game.title}</h3>
<p class="game-desc">${game.description}</p>
</div>
`;
gamesGrid.appendChild(card);
});
}

function startGame() {
attemptsLeft = 3;
timeLeft = 30;
gameActive = true;
feedback.textContent = "";
feedback.className = "feedback";
guessInput.value = "";

const randomIndex = Math.floor(Math.random() * games.length);
currentGame = games[randomIndex];

clueDisplay.textContent = currentGame.clue;
attemptsDisplay.textContent = attemptsLeft;
timerDisplay.textContent = timeLeft;

guessInput.disabled = false;
submitBtn.disabled = false;
startBtn.classList.add("hidden");
playAgainBtn.classList.add("hidden");
guessInput.focus();

clearInterval(timerInterval);
timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
timeLeft--;
timerDisplay.textContent = timeLeft;

if (timeLeft <= 0) {
endGame(false, "TIME'S UP! The game was: " + currentGame.title);
}
}

function checkGuess() {
if (!gameActive) return;

const userGuess = guessInput.value.trim().toLowerCase();
const correctAnswer = currentGame.title.toLowerCase();

if (userGuess === "") {
feedback.textContent = "Please enter a guess!";
feedback.className = "feedback incorrect";
return;
}

if (userGuess === correctAnswer) {
endGame(true, "CORRECT! You cracked the vault!");
} else {
attemptsLeft--;
attemptsDisplay.textContent = attemptsLeft;

if (attemptsLeft <= 0) {
endGame(false, "OUT OF ATTEMPTS! The game was: " + currentGame.title);
} else {
feedback.textContent = `Wrong! ${attemptsLeft} attempt(s) left.`;
feedback.className = "feedback incorrect";
guessInput.value = "";
guessInput.focus();
}
}
}

function endGame(won, message) {
gameActive = false;
clearInterval(timerInterval);

guessInput.disabled = true;
submitBtn.disabled = true;

feedback.textContent = message;
feedback.className = won ? "feedback correct" : "feedback incorrect";

playAgainBtn.classList.remove("hidden");
}

function playAgain() {
playAgainBtn.classList.add("hidden");
startBtn.classList.remove("hidden");
clueDisplay.textContent = "Press START to begin!";
feedback.textContent = "";
feedback.className = "feedback";
attemptsDisplay.textContent = "3";
timerDisplay.textContent = "30";
}

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkGuess);
playAgainBtn.addEventListener("click", playAgain);

guessInput.addEventListener("keydown", function (e) {
if (e.key === "Enter") {
checkGuess();
}
});

renderGameCards();