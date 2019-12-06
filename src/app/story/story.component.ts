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
  currentChapterId = "";
  displayOptions = false;
  initialTime = 0;
  spinner = true;
  playStory = false;
  options = [];
   
  constructor(private story : StoryService, private auth : AuthService, public audio : AudioService ) {
    this.audio.chapterEnded.subscribe(value => {
      this.displayOptions = value;
    });    
  }

  ngOnInit() {
    this.auth.activeUser.subscribe(value => {
      if (value) {
        let savedTracks = this.auth.getSavedTrack();
        let startingChapterId = savedTracks.length ? savedTracks["track_id"] : this.story.getInitial();
        this.initialTime = savedTracks["time_in_seconds"] ? savedTracks["time_in_seconds"] : 0;
        this.startChapter(startingChapterId, false); 
      }
    })
  }


  startChapter(trackId, isChanging = true) {
    this.story.getChapter(trackId).subscribe(data => {
      if (data["success"]) {
        this.currentChapter = data["data"];
        this.playStory = true;
        this.displayOptions= false;
        this.spinner = false;
        this.options = this.currentChapter["options"];
        this.story.saveChapter(this.auth.getUserId(), trackId, this.initialTime)             
      }
    })    
  }  
}