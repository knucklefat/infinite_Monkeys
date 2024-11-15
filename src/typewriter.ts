import { TypewriterAudio } from './audio';
import { KeyboardDisplay } from './keyboard-display';
import { StatsDisplay } from './stats-display';

export class Typewriter {
  private element: HTMLElement;
  private text: string = '';
  private currentIndex: number = 0;
  private isTyping: boolean = false;
  private typeSpeed: number = 100;
  private audio: TypewriterAudio;
  private inputEnabled: boolean = false;
  private keyboardDisplay: KeyboardDisplay;
  private statsDisplay: StatsDisplay;
  private maxCharsPerLine: number = 60;
  private maxLines: number = 25;

  constructor(element: HTMLElement, keyboardDisplay: KeyboardDisplay, statsDisplay: StatsDisplay) {
    this.element = element;
    this.audio = new TypewriterAudio();
    this.keyboardDisplay = keyboardDisplay;
    this.statsDisplay = statsDisplay;

    // Set up keyboard display callback
    this.keyboardDisplay.setTypeCallback(this.handleKeyInput.bind(this));
  }

  public enableKeyboardInput(): void {
    if (this.inputEnabled) return;
    
    this.inputEnabled = true;
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  public focus(): void {
    if (!this.isTyping) {
      this.element.focus();
    }
  }

  private handleKeyInput(key: string): void {
    if (this.isTyping) return;

    if (this.canAddCharacter(key)) {
      this.addCharacter(key);
      if (key !== ' ') {
        this.audio.playTypeSound();
      }
      this.statsDisplay.incrementLetters();
    }
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (this.isTyping) return;

    // Ignore modifier key presses
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    // Handle special keys
    if (event.key === 'Enter') {
      if (this.canAddNewLine()) {
        this.addCharacter('\n');
        this.audio.playReturnSound();
        this.statsDisplay.incrementLetters();
      }
      event.preventDefault();
      return;
    }

    // Handle backspace
    if (event.key === 'Backspace') {
      this.handleBackspace();
      event.preventDefault();
      return;
    }

    // Only handle printable characters
    if (event.key.length === 1 && this.canAddCharacter(event.key)) {
      this.addCharacter(event.key);
      this.keyboardDisplay.pressKey(event.key);
      if (event.key !== ' ') {
        this.audio.playTypeSound();
      }
      this.statsDisplay.incrementLetters();
      event.preventDefault();
    }
  }

  private canAddCharacter(char: string): boolean {
    const lines = this.text.split('\n');
    const currentLine = lines[lines.length - 1] || '';
    
    // Check if we've reached the maximum number of lines
    if (lines.length > this.maxLines) {
      return false;
    }

    // If the current line is at max length and the character isn't a space,
    // check if we can add a new line
    if (currentLine.length >= this.maxCharsPerLine && char !== ' ') {
      return this.canAddNewLine();
    }

    // If it's a space and we're at max length, don't add it
    if (char === ' ' && currentLine.length >= this.maxCharsPerLine) {
      return false;
    }

    return true;
  }

  private canAddNewLine(): boolean {
    const lines = this.text.split('\n');
    return lines.length < this.maxLines;
  }

  private addCharacter(char: string): void {
    const lines = this.text.split('\n');
    const currentLine = lines[lines.length - 1] || '';

    // Handle automatic line wrapping
    if (currentLine.length >= this.maxCharsPerLine && char !== '\n') {
      const words = currentLine.split(' ');
      const lastWord = words[words.length - 1];
      
      // If we're in the middle of a word, wrap at the last space
      if (lastWord && lastWord.length < currentLine.length) {
        this.text = this.text.slice(0, -(lastWord.length)) + '\n' + lastWord + char;
      } else {
        this.text += '\n' + char;
      }
    } else {
      this.text += char;
    }

    this.element.textContent = this.text;
  }

  private handleBackspace(): void {
    if (this.text.length > 0) {
      this.text = this.text.slice(0, -1);
      this.element.textContent = this.text;
      this.audio.playTypeSound();
      this.statsDisplay.decrementLetters();
    }
  }

  public clear(): void {
    this.text = '';
    this.currentIndex = 0;
    this.isTyping = false;
    this.element.textContent = '';
    this.audio.playReturnSound();
    this.statsDisplay.reset();
  }
}

export function createCursor(): HTMLElement {
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  return cursor;
}