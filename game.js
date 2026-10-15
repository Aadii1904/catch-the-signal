// Catch the signal: a signal pops up in one of nine squares; tap it before it moves.
// A round lasts 30 seconds. Catch as many as you can.

const ROUND_SECONDS = 30;
const SIGNAL_MS = 800; // how long the signal stays in one square

// 1. Find the parts of the page we need
const cells = document.querySelectorAll(".cell");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const startButton = document.getElementById("start");
const statusText = document.getElementById("status");
const bestText = document.getElementById("best");

let score = 0;
let timeLeft = ROUND_SECONDS;
let signalAt = -1; // which square (0–8) has the signal; -1 = none
let playing = false;
let signalTimer = null; // moves the signal every SIGNAL_MS
let clockTimer = null; // counts down once a second

// The best score is kept in the browser's storage, so it's still there next time.
// Some places (private windows, the playground on travellingcoder.in) block storage,
// so reading and saving are wrapped in try/catch: the game just won't remember then.
const BEST_KEY = "catch-the-signal-best";
let best = 0;
try {
  best = Number(localStorage.getItem(BEST_KEY)) || 0;
} catch (e) {}
bestText.textContent = best;

// 2. Put the signal in a random square (never the same one twice in a row)
function moveSignal() {
  clearSignal();

  let next = Math.floor(Math.random() * cells.length); // a whole number from 0 to 8
  while (next === signalAt) {
    next = Math.floor(Math.random() * cells.length);
  }

  signalAt = next;
  cells[signalAt].classList.add("on");
  cells[signalAt].textContent = "📶";
}

function clearSignal() {
  if (signalAt >= 0) {
    cells[signalAt].classList.remove("on");
    cells[signalAt].textContent = "";
  }
}

// 3. Start a round: reset everything, then start the two timers
function startGame() {
  score = 0;
  timeLeft = ROUND_SECONDS;
  scoreText.textContent = score;
  timeText.textContent = timeLeft;
  statusText.textContent = "";
  startButton.disabled = true;
  playing = true;

  moveSignal();
  signalTimer = setInterval(moveSignal, SIGNAL_MS);
  clockTimer = setInterval(tick, 1000);
}

// Once a second: one second less; at zero the round ends
function tick() {
  timeLeft = timeLeft - 1;
  timeText.textContent = timeLeft;
  if (timeLeft === 0) endGame();
}

function endGame() {
  clearInterval(signalTimer);
  clearInterval(clockTimer);
  playing = false;
  clearSignal();
  signalAt = -1;
  statusText.textContent = "Time's up! You caught " + score + (score === 1 ? " signal." : " signals.");

  if (score > best) {
    best = score;
    bestText.textContent = best;
    statusText.textContent += " New best! 🎉";
    try {
      localStorage.setItem(BEST_KEY, String(best));
    } catch (e) {}
  }

  startButton.textContent = "Play again";
  startButton.disabled = false;
}

// 4. Clicking the square with the signal scores a point. The signal jumps right away,
//    and its timer restarts so the new square gets its full time.
cells.forEach(function (cell, index) {
  cell.addEventListener("click", function () {
    if (!playing || index !== signalAt) return; // not playing, or missed: nothing happens
    score = score + 1;
    scoreText.textContent = score;
    moveSignal();
    clearInterval(signalTimer);
    signalTimer = setInterval(moveSignal, SIGNAL_MS);
  });
});

startButton.addEventListener("click", startGame);
