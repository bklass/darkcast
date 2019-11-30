import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  open = false;
  error = false;
  message = "essa é a mensagem default"
  constructor() { }

  ngOnInit() {
  }

  openAlert() {
    this.open = true;    
  }
  closeAlert() {
    this.open = false;
  }

  setMessage() {
    this.message 
  }
}
