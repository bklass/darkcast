import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
   base = "http://ec2-34-204-42-208.compute-1.amazonaws.com:3000/api/";
   api = {
    users  :  this.base + "users",
    tracks :  this.base + "tracks",
    login  :  this.base + "users/login",
    logout :  this.base + "users/me/logout",
    me     :  this.base + "users/me"
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

  logout () {
    return this.api.logout;
  }

  me() {
    return this.api.me;
  }  
}
