import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  
  constructor(private auth : AuthService, private formBuilder : FormBuilder) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [null, [Validators.required, Validators.email]],
      pass : [null, Validators.required]
    })
  }

  loginUser (e) {
    event.preventDefault();
    const target = e.target;
    const email = target.querySelector('#user').value;
    const pass = target.querySelector('#pass').value;

    this.auth.getUserDetails(email, pass);
    
  }
}
