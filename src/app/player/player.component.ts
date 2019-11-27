import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from "../audio.service";
import { StreamState } from "../interfaces/stream-state";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent {
  state: StreamState;
  @Input() currentFile: string;
  @Input() background : string;
  @Input() filename : string;
  
  
  

  

  constructor(public audioService: AudioService) {
    this.audioService.getState().subscribe( state => {
       this.state = state;       
     })     
     
  }

  ngOnInit(){
    this.playStream(this.currentFile)
  }

  playStream(url) {
    console.log(url);
    this.audioService.playStream(url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    console.log("here we go")
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}

