import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AlertService } from "../service/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  user = { userName : "", pass : "" }
  constructor(private auth : AuthService, private formBuilder : FormBuilder, private alert: AlertService) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [null, [Validators.required, Validators.email]],
      pass : [null, Validators.required]
    })
  }

  loginUser (e) {
    event.preventDefault();
    this.auth.getUserDetails(this.user.userName, this.user.pass);
  }

  redirectUser(data) {
    
  }

  
}
