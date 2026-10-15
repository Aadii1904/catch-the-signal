// Catch the signal: a signal pops up in one of nine squares; tap it to score.

// 1. Find the parts of the page we need
const cells = document.querySelectorAll(".cell");
const scoreText = document.getElementById("score");

let score = 0;
let signalAt = -1; // which square (0–8) has the signal; -1 = none yet

// 2. Put the signal in a random square (never the same one twice in a row)
function moveSignal() {
  if (signalAt >= 0) {
    cells[signalAt].classList.remove("on");
    cells[signalAt].textContent = "";
  }

  let next = Math.floor(Math.random() * cells.length); // a whole number from 0 to 8
  while (next === signalAt) {
    next = Math.floor(Math.random() * cells.length);
  }

  signalAt = next;
  cells[signalAt].classList.add("on");
  cells[signalAt].textContent = "📶";
}

// 3. Clicking the square with the signal scores a point, and the signal jumps away
cells.forEach(function (cell, index) {
  cell.addEventListener("click", function () {
    if (index !== signalAt) return; // missed: nothing happens
    score = score + 1;
    scoreText.textContent = score;
    moveSignal();
  });
});

moveSignal();
