import { Component, Input } from '@angular/core';
import { AudioService } from "../audio.service";
import { StoryService } from "../story.service";
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
  @Input() initialTime: string;
  duration = ""
  currentTime = ""
  backgroundStyle = ""
  private _actualFile: string;

  @Input() set currentFile(value: string) {
    if (value) {
      this._actualFile = value;
      this.playStream(this._actualFile);
    }
  }
  

  constructor(private audioService: AudioService, private story: StoryService) {
    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });

    
  }

  ngOnInit() {    
    this.playStream(this._actualFile);      
    this.audioService.seekTo(this.initialTime);
  }

  playStream(url) {
    this.audioService.playStream(url)    
    .subscribe(events => {
      this.currentTime = events['path'][0]['currentTime'];
      if (events['type'] == "ended")  {
        this.audioService.endChapter();
      }
      if (events['type'] == "pause")  {
        console.log("This pause")
        this.story.savePosition(this.currentTime);       
      }
    });    
  }

  
  getBackground(){
    return {
      backgroundImage : 'url('+this.background+')',
      backgroundSize: "cover",
      backgroundPosition : "center",
      minHeight : "200px"
    }
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