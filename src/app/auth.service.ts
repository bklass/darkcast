import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LibraryService } from './library.service';
import { AlertService } from './service/alert.service';
import {Router} from '@angular/router';
import { Subject, BehaviorSubject } from "rxjs";

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
  loggedUser = { active : false, name: "", _id: "", email: "", savedTrack: {}, token : ""}
  activeUser = new BehaviorSubject<boolean>(false);
  
  constructor(private http : HttpClient, private router : Router, private library : LibraryService, private alert : AlertService) {  }

  getUserName () {
    return this.loggedUser.name;
  }

  getUserEmail() {
    return this.loggedUser.email;
  }

  getUserId() {
    return this.loggedUser._id;
  }

  getUserTrack(n = 0 ) {
    return this.loggedUser.savedTrack[ n != 0 ? n : this.loggedUser.savedTrack[this.loggedUser.savedTrack.length-1]];
  }

  getUserTokens() {
    return this.loggedUser.token;
  }

  getSavedTrack () {
    return this.loggedUser.savedTrack[0] ? this.loggedUser.savedTrack[0] : "" ;    
  }

  activateUser() {
    this.activeUser.next(true);
  }

  deactivateUser(){
    this.activeUser.next(false);
  }

  setSavedTrack(trackId) {
    this.loggedUser.savedTrack.track_id = trackId;
  }
 
 
  isLoggedIn () {
    if (localStorage.getItem("accessToken")) {
      if (this.loggedUser.name == "")  {
        let header = new HttpHeaders({'content-type' : 'application/json', 'authorization' : 'Bearer ' + localStorage.getItem("accessToken"),  'Accept': '*' });
        this.http.get<myData[]>(this.library.me(), {headers : header} ).subscribe(data => {
          if (data['success']) {
            this.logIn(data);
          }
        })
      }
      return true;      
    } 
    return false;   
  }

 


  logIn(data) {
    this.loggedUser.active = true;
    this.loggedUser.name = data.data.name;
    this.loggedUser.email = data.data.email;
    this.loggedUser._id = data.data._id;    
    this.loggedUser.savedTrack = data.data.tracks_saved;
    this.loggedUser.token = data.data.tokens[0].token;  
    
    localStorage.setItem( "accessToken", this.loggedUser.token );
    this.activateUser();
  }

  logOut() {
    let header = new HttpHeaders({'content-type' : 'application/json', 'authorization' : 'Bearer ' + localStorage.getItem("accessToken"),  'Accept': '*' });
          
    this.http.post<myData[]>(this.library.logout(), {},{headers : header }).subscribe(data => {
      if (data['success']) {
        localStorage.removeItem("accessToken")
        this.router.navigateByUrl("/");    
      }
    })
  }

  getUserDetails(email, pass) {
    this.http.post<myData[]>(this.library.login(), {
      "email": email,
      "password":pass
    }).subscribe(data => {
      //check if the login was sucessfull
      if (data['success']) {
        this.logIn(data);
        this.router.navigateByUrl("/home");      
      } else {
        this.alert.printMessage("Usuário ou senha incorretos", false);        
      }
    })
  }
}
