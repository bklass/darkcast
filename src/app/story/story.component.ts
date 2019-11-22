import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})

export class StoryComponent implements OnInit {
  currentStory = [];

  
  constructor(private story : StoryService) {
    
  }

  ngOnInit() {
    console.log("story init")
    this.story.getStories().subscribe(data => {
      this.currentStory = data;

      console.log(this.currentStory)
    });
  }

}
