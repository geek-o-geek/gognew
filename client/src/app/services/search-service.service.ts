import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  SERVER_PATH: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  search(term) {
    const endpoint = `${this.SERVER_PATH}/api/gettopics/${term}`
    console.log(endpoint)
    return this.http.get(endpoint)
  }
}
