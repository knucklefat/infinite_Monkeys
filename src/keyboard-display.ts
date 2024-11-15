export class KeyboardDisplay {
  private element: HTMLElement;
  private keys: Map<string, HTMLElement> = new Map();
  private readonly keyLayout = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
  ];
  private typeCallback: ((key: string) => void) | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.createKeys();
  }

  public setTypeCallback(callback: (key: string) => void): void {
    this.typeCallback = callback;
  }

  private createKeys(): void {
    this.keyLayout.forEach(key => {
      const keyElement = document.createElement('div');
      keyElement.className = 'vintage-key';
      keyElement.textContent = key;
      keyElement.addEventListener('click', () => this.handleKeyClick(key.toLowerCase()));
      keyElement.setAttribute('role', 'button');
      keyElement.setAttribute('tabindex', '0');
      keyElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleKeyClick(key.toLowerCase());
        }
      });
      this.element.appendChild(keyElement);
      this.keys.set(key.toLowerCase(), keyElement);
    });

    // Add space bar
    const spaceBar = document.createElement('div');
    spaceBar.className = 'vintage-key space-bar';
    spaceBar.textContent = 'SPACE';
    spaceBar.addEventListener('click', () => this.handleKeyClick(' '));
    spaceBar.setAttribute('role', 'button');
    spaceBar.setAttribute('tabindex', '0');
    spaceBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleKeyClick(' ');
      }
    });
    this.element.appendChild(spaceBar);
    this.keys.set(' ', spaceBar);
  }

  private handleKeyClick(key: string): void {
    this.pressKey(key);
    if (this.typeCallback) {
      this.typeCallback(key);
    }
  }

  public pressKey(key: string): void {
    const keyElement = this.keys.get(key.toLowerCase());
    if (keyElement) {
      keyElement.classList.add('pressed');
      setTimeout(() => keyElement.classList.remove('pressed'), 100);
    }
  }
}