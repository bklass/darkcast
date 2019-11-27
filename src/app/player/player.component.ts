import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from "../audio.service";
import { StreamState } from "../interfaces/stream-state";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files: Array<any> = [];
  state: StreamState;
  @Input() currentFile: string;
  @Input() filename: string;
  duration = ""
  currentTime = ""
  

  constructor(private audioService: AudioService) {
    // get media files
    this.files = [this.currentFile];    
    
    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {    
    this.playStream(this.currentFile);    
  }

  playStream(url) {
    this.audioService.playStream(url)    
    .subscribe(events => {
      this.currentTime = events['path'][0]['currentTime'];
      if (events['type'] == "ended")  {
        this.audioService.endChapter();
      }
    });
    
  }

  
  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}