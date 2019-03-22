import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  SERVER_PATH: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  search(term) {
    const endpoint = `${this.SERVER_PATH}/api/searchresult/${term}`
    return this.http.get(endpoint)
  }
}
