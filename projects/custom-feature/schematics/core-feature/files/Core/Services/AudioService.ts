import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root',
  })
export class AudioService {


     audio: HTMLAudioElement;
     constructor() {
       this.audio = new Audio();
     }
    playAudio(): void {    
        this.audio.pause();
        this.audio.src = "../../../assets/sound/notification-sound.wav";
        this.audio.load();
        this.audio.play();
      }
}

