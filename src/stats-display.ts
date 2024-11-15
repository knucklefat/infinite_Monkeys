export class StatsDisplay {
  private letterCountElement: HTMLElement;
  private monkeyCountElement: HTMLElement;
  private letterCount: number = 0;
  private monkeyCount: number = 1;

  constructor(letterCountElement: HTMLElement, monkeyCountElement: HTMLElement) {
    this.letterCountElement = letterCountElement;
    this.monkeyCountElement = monkeyCountElement;
    this.updateDisplay();
  }

  public incrementLetters(): void {
    this.letterCount++;
    this.updateDisplay();
    
    // Add more monkeys as letter count increases
    if (this.letterCount % 100 === 0) {
      this.monkeyCount++;
      this.updateDisplay();
    }
  }

  public decrementLetters(): void {
    if (this.letterCount > 0) {
      this.letterCount--;
      this.updateDisplay();
      
      // Remove monkeys if letter count drops
      if (this.letterCount % 100 === 99) {
        this.monkeyCount = Math.max(1, this.monkeyCount - 1);
        this.updateDisplay();
      }
    }
  }

  public reset(): void {
    this.letterCount = 0;
    this.monkeyCount = 1;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.letterCountElement.textContent = this.letterCount.toString();
    this.monkeyCountElement.textContent = this.monkeyCount.toString();
  }
}