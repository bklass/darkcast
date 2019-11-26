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
    // this.story.getStory('tracks').subscribe(data=> {
      // console.log(data);
      // this.story.setStory(data);
      // this.startChapter("audio1");
    // })

  }

  startChapter(trackId) {
    this.currentChapter = <myStories[]>this.story.getStoryChapter(trackId);    
  }

}
