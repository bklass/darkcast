import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LibraryService } from './library.service';
import {Router} from '@angular/router';

interface myData {
  obj : object
}

interface UserPostResponse {
  success : boolean;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedUser = { active : true, name: "", _id: "", email: "", savedTrack: "", token : ""}
  constructor(private http : HttpClient, private router : Router, private library : LibraryService ) {  }

  getUserName () {
    return this.loggedUser.name;
  }

  getUserEmail() {
    return this.loggedUser.email;
  }

  getUserId() {
    return this.loggedUser._id;
  }

  getUserTrack() {
    return this.loggedUser.savedTrack;
  }

  getUserTokens() {
    return this.loggedUser.token;
  }

  getSavedTrack () {
    return this.loggedUser.savedTrack;
  }

  isLoggedIn () {
    return this.loggedUser.active;
  }

  logIn(data) {
    this.loggedUser.active = true;
    this.loggedUser.name = data.data.name;
    this.loggedUser.email = data.data.email;
    this.loggedUser._id = data.data._id;    
    this.loggedUser.savedTrack = data.data.tracks_saved;
    this.loggedUser.token = data.data.tokens[0].token;  
    
    localStorage.setItem( "accessToken", this.loggedUser.token );
    

    console.log(data);
    console.log(this.loggedUser);
  }

  logOut() {
    console.log("esta no logout auth service")
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.loggedUser.token);
    console.log(this.loggedUser.token);
    
    this.http.post<myData[]>(this.library.logout(), {
      "token": this.loggedUser.token
    }, {headers : headers }).subscribe(data => {
      console.log(data);
    })
  }

  getUserDetails(email, pass) {
    this.http.post<myData[]>(this.library.login(), {
      "email": email,
      "password":pass
    }).subscribe(data => {
      //check if the login was sucessfull
      console.log(data)
      if (data['success']) {
        this.logIn(data);
        this.router.navigateByUrl("/home");      
      } else {
        // error modal maybe??
      }
    })
  }
}
