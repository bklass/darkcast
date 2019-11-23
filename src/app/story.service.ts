import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface myStories {
  obj : object
}

@Injectable({
  providedIn: 'root'
})


export class StoryService {
  story = [];

  constructor(private http : HttpClient ) {
    
  }

  
  getStories() {
    return this.http.get<myStories[]>('/v2/5dd7298c32000076a0888ee3');
  }
  
  getStory(story) {
    // return this.http.get<myStories[]>(story)
    return true;
  }

  setStory (story) {
    this.story = story;   
  }

  getStoryChapter(trackId) {
    return <myStories[]>this.story[trackId];
  }


  saveStory(trackId, timeInSeconds) {
    this.http.post<myStories[]>('apiThatWillSaveTheSotyTrack', {
      trackId,
      timeInSeconds
    });
  }


}