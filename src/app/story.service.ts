import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LibraryService } from './library.service';
import { AuthService } from "./auth.service";


interface myStories {
  obj : object
}

@Injectable({
  providedIn: 'root'
})


export class StoryService {
  story = [];

  constructor(private http : HttpClient, private library : LibraryService, private auth :  AuthService) {
    
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
  savePosition(timeInSeconds) {
    if(this.auth.getSavedTrack().length){
      if (timeInSeconds != this.auth.getSavedTrack()["time_in_seconds"]) {
        this.saveChapter(this.auth.getUserId(), this.auth.getSavedTrack()["track_id"], timeInSeconds);
      }
    } else {
      this.saveChapter(this.auth.getUserId(), this.getInitial(), timeInSeconds);
    }
    
  }

  saveChapter(userId, trackId, timeInSeconds) {
    let header = new HttpHeaders({'content-type' : 'application/json', 'authorization' : 'Bearer ' + localStorage.getItem("accessToken"),  'Accept': '*' });          
    this.http.put<myStories[]>(this.library.users()+"/"+userId, {
      "remove_track_id": this.auth.getSavedTrack() ? this.auth.getSavedTrack() : "" ,
      "track_id" : trackId,
      "time_in_seconds" : timeInSeconds == 0 ? 1 : timeInSeconds
    },{headers : header }).subscribe(data => {
      
    })
  }


}