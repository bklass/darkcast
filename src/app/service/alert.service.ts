import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  msg = ""
  private msgChange: BehaviorSubject<String> = new BehaviorSubject(this.msg);
  constructor() { }

  printMessage(msg) {
    console.log(msg);
    this.msgChange = msg;
  }

  getMessage(): Observable<any> {
    return this.msgChange.asObservable();
  }
}
