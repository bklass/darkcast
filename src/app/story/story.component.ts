import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';
import { AuthService } from "../auth.service";

interface myStories {
  obj : object
}

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})

export class StoryComponent implements OnInit {
  currentChapter = []
  
 
  
  constructor(private story : StoryService, private auth : AuthService) {
    
  }

  ngOnInit() {
    let startingChapterId = this.auth.getSavedTrack()[length] ? this.auth.getSavedTrack() : this.story.getInitial();
    this.startChapter(startingChapterId);
  }

  startChapter(trackId) {
    this.story.getChapter(trackId).subscribe(data => {
      console.log(data);
    })
    console.log(trackId);
    // this.currentChapter = <myStories[]>this.story.getStoryChapter(trackId);    
  }

}
