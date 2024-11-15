import './style.css';
import { Typewriter, createCursor } from './typewriter';
import { KeyboardDisplay } from './keyboard-display';
import { StatsDisplay } from './stats-display';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="typewriter">
    <div class="stats">
      <div class="monkey-count">Current Monkeys: <span id="monkeyCount">1</span></div>
      <div class="letter-count">Letters: <span id="letterCount">0</span></div>
    </div>
    <div class="brand">
      <img src="https://icons-for-free.com/iff/png/512/monkey+red+reddit+icon-1320193948646565420.png" alt="Monkey Icon" class="brand-icon">
      <span>INFINITE MONKEYS</span>
    </div>
    <div class="paper-container">
      <div class="paper" id="paper">
        <span id="output"></span>
      </div>
    </div>
    <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/community/typewriter-mechanism-2.png" alt="Typewriter Mechanism" class="typewriter-mechanism">
    <div class="keyboard-row"></div>
    <div class="controls">
      <button id="clearButton">New Page</button>
    </div>
  </div>
`;

const output = document.querySelector<HTMLElement>('#output')!;
output.appendChild(createCursor());

const statsDisplay = new StatsDisplay(
  document.querySelector<HTMLElement>('#letterCount')!,
  document.querySelector<HTMLElement>('#monkeyCount')!
);

const keyboardDisplay = new KeyboardDisplay(
  document.querySelector<HTMLElement>('.keyboard-row')!
);

const typewriter = new Typewriter(output, keyboardDisplay, statsDisplay);

document.querySelector('#clearButton')?.addEventListener('click', () => {
  typewriter.clear();
});

// Enable keyboard input
const paper = document.querySelector('#paper')!;
paper.addEventListener('click', () => typewriter.focus());

// Initialize keyboard input
typewriter.enableKeyboardInput();