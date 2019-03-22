import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gog';
  isRemoveTemp: boolean = false
  constructor(
    db: AngularFireDatabase){}

  ngOnInit(){
    
  }
}
