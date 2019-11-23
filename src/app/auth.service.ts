import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  loggedUser = { active : false, name: "", savedTrack: ""}
  constructor(private http : HttpClient, private router : Router, private library : LibraryService ) {  }

  getUserName () {
    return this.loggedUser.name;
  }

  getSavedTrack () {
    return this.loggedUser.savedTrack;
  }

  getUserDetails(email, pass) {
    console.log("Asadas");
    return this.http.post<myData[]>(this.library.login(), {
      "email" : "goaiba@pessego.com",
      "password": "abacate"
    }).subscribe(data => {
      console.log(data);
      //we have to add a validation to see if the login was successful on the BE
      // this.router.navigateByUrl("/home");      
    })
  }
}
