import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor() { }
  
  @Output() removeTemp: EventEmitter<any> = new EventEmitter<any>()
  removeTemplate(){
    this.removeTemp.emit({isRemoveTemp: true})
  }
}
