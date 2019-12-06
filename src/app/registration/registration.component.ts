import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LibraryService } from '../library.service';
import {Router} from '@angular/router';
import { AlertService } from "../service/alert.service";


interface myData {
  obj : object
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  form: FormGroup;
  user = { email : "", userName: "", pass : ""};

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private library : LibraryService, private router : Router, private alert : AlertService) { 

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [null, [Validators.required, Validators.email]],
      name : [null, Validators.required],
      pass : [null, [Validators.required,Validators.maxLength(12), Validators.minLength(5)]],
      rePass : [null, [Validators.required,Validators.maxLength(12), Validators.minLength(5)]],  
      confirm: [ null, null]
    }, {validator: this.passwordMatchValidator})

    
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('pass').value === g.get('rePass').value
      ? null
      : { mismatch: true };
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('rePass').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  printMessage() {
    this.alert.printMessage("hahahaha", false);
  }

  createUser(event) {
    this.http.post<myData[]>(this.library.users(), {
      "name" : this.user.userName,      
      "email": this.user.email,
      "password" : this.user.pass
    }).subscribe(data => {
      this.alert.printMessage(data["message"], data["success"]);      
    })

    
    
  }

  

}
