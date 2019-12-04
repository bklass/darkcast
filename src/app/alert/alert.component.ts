import { Component, OnInit, Injectable } from '@angular/core';
import { AlertService } from "../service/alert.service";


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

@Injectable()
export class AlertComponent implements OnInit {
  alertTitle = "Sucesso!"
  open = true;
  error = false;
  message = "essa é a mensagem default"
  constructor( private alertService : AlertService) {
    
   }

  ngOnInit() {
    this.alertService.getMessage()
    .subscribe(message => {
      console.log("yeaaaaah!");
      this.message = message;
    });
  }

  openAlert() {
    this.open = true;    
  }
  closeAlert() {
    this.open = false;
  }

  setMessage(message) {
    this.message  = message;
  }
}
