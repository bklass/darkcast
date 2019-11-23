import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
   api = {
    users  :  "http://ec2-54-172-67-42.compute-1.amazonaws.com:3000/api/users",
    tracks :  "http://ec2-54-172-67-42.compute-1.amazonaws.com:3000/api/tracker",
    login  :  "http://ec2-54-172-67-42.compute-1.amazonaws.com:3000/api/users/login"
  }
  constructor() { }

  users() {
    return this.api.users;
  }

  trackes() {
    return this.api.tracks;
  }

  login() {
    return this.api.login;
  }

  
}
