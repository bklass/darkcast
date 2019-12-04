import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  msg = new Subject<string>();
  title = new Subject<string>();
  open = new Subject<boolean>();
  error = new Subject<boolean>();
  
  constructor() { }

  printMessage(msg, success) {
    this.msg.next(msg);
    this.error.next(!success);
    this.openAlert();
    if(!success) {
      this.setTitle("... ooops! Erro")
    }
  }

  openAlert() {
    this.open.next(true);    
  }

  setTitle(title) {
    this.title.next(title)
  }

}
