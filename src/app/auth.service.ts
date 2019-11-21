import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface myData {
  obj : Object
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) {

   }

  getUserDetails(email, pass) {
    console.log("Wihting get user details")
    console.log(email)
    console.log(pass)

    return this.http.post('/v2/5dd673f2320000ab43888a63', {
      email,
      pass
    }).subscribe(data => {
      console.log(data," is what we got from the server");
    })
    //post these details to API server return user info if correct
  }
}
