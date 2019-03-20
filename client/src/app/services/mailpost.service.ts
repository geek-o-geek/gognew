import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailpostService {

  constructor(private http: HttpClient) { }

  mailPost(obj){ 
    const SERVER_PATH = 'http://localhost:3000/';
    const endpoint = `${SERVER_PATH}api/contact`
    return this.http.post(endpoint, obj);
  }
}
