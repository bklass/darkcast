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
  open = false;
  error = false;
  message = "essa é a mensagem default"
  constructor( private alertService : AlertService) {
    
   }

  ngOnInit() {
    this.alertService.msg.subscribe(value => {
      this.setMessage(value);
    });

    this.alertService.open.subscribe(value => {
      if (value){
        this.openAlert();
      } else {
        this.closeAlert();
      }
    });

    this.alertService.error.subscribe(value => {
      this.setState(value)
    });

    this.alertService.title.subscribe(value => {
      this.alertTitle =value
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

  setState(val) {
    this.error = val;
  }
}
