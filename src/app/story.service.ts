import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LibraryService } from './library.service';


interface myStories {
  obj : object
}

@Injectable({
  providedIn: 'root'
})


export class StoryService {
  story = [];

  constructor(private http : HttpClient, private library : LibraryService) {
    
  }
  
  getInitial() {
    return "5dd9948ce5f31f578a7fb4e3"
  }
  
  getStories() {
    return this.http.get<myStories[]>('/v2/5dd7298c32000076a0888ee3');
  }
  
  getChapter(story) {
    return this.http.get<myStories[]>(this.library.tracks()+"/"+story, {})
  }

  setStory (story) {
    this.story = story;   
  }

  getStoryChapter(trackId) {
    return <myStories[]>this.story[trackId];
  }


  saveChapter(userId, trackId, timeInSeconds) {
    let header = new HttpHeaders({'content-type' : 'application/json', 'authorization' : 'Bearer ' + localStorage.getItem("accessToken"),  'Accept': '*' });
          
    this.http.put<myStories[]>(this.library.users()+"/"+userId, {
      "trackId" : trackId,
      "timeInSeconds" : timeInSeconds
    },{headers : header }).subscribe(data => {
      console.log(data);            
    })
  }


}