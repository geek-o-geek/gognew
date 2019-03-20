import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CreatepostService {

  constructor(private http: HttpClient) { }

  createPost(obj){ 
    const SERVER_URL = 'http://localhost:3000/'
    const endpoint = `${SERVER_URL}api/createpost/`
    return this.http.post(endpoint, obj)
  }
}
