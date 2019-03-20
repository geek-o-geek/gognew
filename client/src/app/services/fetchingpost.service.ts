import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Post {
  data: string;
}

@Injectable({
  providedIn: 'root'
})

export class FetchingpostService {
  constructor(private http: HttpClient) {}

  fetchPost(obj){
    const SERVER_PATH = 'http://localhost:3000/';
    const { id, topic } = obj
    const endpoint = `${SERVER_PATH}api/gettopics/${topic}/${id}`
    return this.http.get(endpoint);
  }
}
