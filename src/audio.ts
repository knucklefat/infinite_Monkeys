export class TypewriterAudio {
  private typingSound: HTMLAudioElement;
  private returnSound: HTMLAudioElement;
  private keyClickSounds: HTMLAudioElement[];
  private volume: number = 0.3;

  constructor() {
    this.typingSound = new Audio('https://next.frame.io/project/e876842b-5e55-4fb5-a488-f6e69b39a729/view/f341bff8-6cc5-4f70-b2b9-0fb21fa9d222');
    this.returnSound = new Audio('https://next.frame.io/project/e876842b-5e55-4fb5-a488-f6e69b39a729/view/d5a34620-827b-466c-beac-ebff5c49eeca');
    
    this.keyClickSounds = [
      new Audio('https://next.frame.io/project/e876842b-5e55-4fb5-a488-f6e69b39a729/view/af2f42fb-209e-4f06-9b79-f38893ff05a4'),
      new Audio('https://next.frame.io/project/e876842b-5e55-4fb5-a488-f6e69b39a729/view/8d89e5ff-35e0-476b-9ef3-afe8278e3466')
    ];
    
    this.typingSound.volume = this.volume;
    this.returnSound.volume = this.volume;
    this.keyClickSounds.forEach(sound => sound.volume = this.volume);
  }

  public playTypeSound(): void {
    const randomSound = this.keyClickSounds[Math.floor(Math.random() * this.keyClickSounds.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch(() => {
      // Handle any audio playback errors silently
    });
  }

  public playReturnSound(): void {
    this.returnSound.currentTime = 0;
    this.returnSound.play().catch(() => {
      // Handle any audio playback errors silently
    });
  }
}