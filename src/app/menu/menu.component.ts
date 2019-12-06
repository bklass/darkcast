import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private user : AuthService) { }

  ngOnInit() {    
  }

  logOut() {
    this.user.logOut();
  }

}
