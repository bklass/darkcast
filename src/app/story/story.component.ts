import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';
import { AuthService } from "../auth.service";
import { AudioService } from '../audio.service';


interface myStories {
  obj : object
}

interface myBool {
  state: boolean
}

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})

export class StoryComponent implements OnInit {
  currentChapter = []
  displayOptions = false;
  playStory = false;
  options = [];
   
  constructor(private story : StoryService, private auth : AuthService, public audio : AudioService ) {
    this.audio.chapterEnded.subscribe(value => {
      this.displayOptions = value;
    });
  }

  ngOnInit() {
    let startingChapterId = this.auth.getSavedTrack()[length] ? this.auth.getSavedTrack() : this.story.getInitial();
    this.startChapter(startingChapterId, false);
    
  }

  startChapter(trackId, isChanging = true) {
    this.story.getChapter(trackId).subscribe(data => {
      if (data["success"]) {
        this.currentChapter = data["data"];
        this.playStory = true;
        this.displayOptions= false;
        this.options = this.currentChapter["options"];
        if (isChanging) {
          
          
        }        
      }
    })    
  }  
}