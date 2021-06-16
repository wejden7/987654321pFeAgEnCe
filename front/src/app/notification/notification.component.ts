import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
@Input()titre:string;
@Input()soustitre:string;
@Input()type:string;
  constructor() { }

  ngOnInit() {
  }

}
