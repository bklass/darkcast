import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  user = { email : "", userName: "", pass : ""};

  constructor(private formBuilder : FormBuilder) { 

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [null, [Validators.required, Validators.email]],
      name : [null, Validators.required],
      pass : [null, [Validators.required,Validators.maxLength(12), Validators.minLength(5)]],
      rePass : [null, [Validators.required,Validators.maxLength(12), Validators.minLength(5)]],  
      confirm: [ null, null]
    })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('rePass').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  createUser() {
    this.user.email = "email@email.com";
    this.user.userName = "Meu Nome";
    this.user.pass = "thisPassword";
  }

}
