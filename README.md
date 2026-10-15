# Catch the signal 📶

A tiny game for when the internet is down. A Wi-Fi signal pops up in one of nine squares; tap it before it jumps somewhere else. You have 30 seconds.

- **Play:** press Start, then tap or click the square with the 📶
- Your best score is kept in the browser
- Follows your system's light or dark mode

It's the offline page of [travellingcoder.in](https://travellingcoder.in): lose your connection on the site and this is what you get. You can also play it, and edit the code live, at [travellingcoder.in/projects/catch-the-signal](https://travellingcoder.in/projects/catch-the-signal).

## How it works (the short version)

> Every 0.8 seconds the game picks a random square and puts the signal there. Clicking that square adds a point. A clock counts down from 30, and when it hits zero the game stops.

That's it: two timers and a click listener.

1. **The page** (`index.html`): a scoreboard, a Start button and nine `<button>` squares in a 3×3 CSS grid.
2. **A random square** (`moveSignal` in `game.js`): `Math.floor(Math.random() * 9)` gives a number from 0 to 8. That square gets the `on` class (orange) and the 📶.
3. **Two timers**: `setInterval(moveSignal, 800)` moves the signal, and `setInterval(tick, 1000)` counts the clock down. `clearInterval` stops both when time's up.
4. **Scoring**: each square listens for clicks. If it's the one with the signal, the score goes up and the signal jumps straight away.
5. **Best score**: saved with `localStorage`, so it's still there next time.

## Built step by step

Each commit adds one idea, so the history reads like a tutorial:

1. The page, a scoreboard and a 3×3 grid (HTML and CSS only)
2. Light up a random square and score on click
3. 30-second rounds with a moving signal
4. Remember the best score

## Files

- `index.html`: the page
- `style.css`: colours and layout
- `game.js`: the game (plain JavaScript, no libraries)

Open `index.html` in a browser to play; no build step.
