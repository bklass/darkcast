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

  constructor(private http : HttpClient, private router : Router) {
  }

  getUserDetails(email, pass) {
    return this.http.post('/v2/5dd673f2320000ab43888a63', {
      email,
      pass
    }).subscribe(data => {
      //we have to add a validation to see if the login was successful on the BE
      this.router.navigateByUrl("/home");      
    })
  }
}
