import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface myStories {
  obj : object
}

@Injectable({
  providedIn: 'root'
})


export class StoryService {
  ;
    constructor(private http : HttpClient ) {
  }

  getStories() {
    return this.http.get<myStories[]>('/v2/5dd7298c32000076a0888ee3');
  }

  saveStory(trackId, timeInSeconds) {
    this.http.post<myStories[]>('apiThatWillSaveTheSotyTrack', {
      trackId,
      timeInSeconds
    });
  }


}