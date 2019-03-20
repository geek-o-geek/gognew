import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  constructor(private http: HttpClient) { }

  search(term) {
    const SERVER_PATH = 'http://localhost:3000/';
    const endpoint = `${SERVER_PATH}api/gettopics/${term}`
    return this.http.get(endpoint)
  }
}
