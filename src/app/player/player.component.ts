import { Component, Input } from '@angular/core';
import { AudioService } from "../audio.service";
import { StreamState } from "../interfaces/stream-state";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  state: StreamState;
  
  @Input() filename: string;
  @Input() background: string;
  duration = ""
  currentTime = ""
  backgroundStyle = ""
  private _actualFile: string;

  @Input() set currentFile(value: string) {
    if (value) {
      console.log(value)
      this._actualFile = value;
      this.playStream(this._actualFile);
    }
  }
  

  constructor(private audioService: AudioService) {
    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {    
    this.playStream(this._actualFile);    
    this.setBackground();
  }

  playStream(url) {
    this.audioService.playStream(url)    
    .subscribe(events => {
      console.log("events");
      console.log(events);
      this.currentTime = events['path'][0]['currentTime'];
      if (events['type'] == "ended")  {
        this.audioService.endChapter();
      }
    });
    
  }

  setBackground() {
    this.backgroundStyle  = "background: url('"+this.background+"'); background-size: cover; background-position: center center; min-height: 200px;"
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