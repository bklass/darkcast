import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

interface myData {
  obj : Object
}

interface UserPostResponse {
  success : boolean;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedUser = { active : false, name: "", savedTrack: ""}
  constructor(private http : HttpClient, private router : Router) {
  }

  getUserName () {
    return this.loggedUser.name;
  }

  getSavedTrack () {
    return this.loggedUser.savedTrack;
  }

  getUserDetails(email, pass) {
    return this.http.post<myData[]>('/v2/5dd673f2320000ab43888a63', {
      email,
      pass
    }).subscribe(data => {
      //we have to add a validation to see if the login was successful on the BE
      this.router.navigateByUrl("/home");      
    })
  }
}
