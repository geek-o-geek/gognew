import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config'

@Injectable()
export class AdminauthService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/api/login`, { username: username, password: password })
            .pipe(map(user => { 
                console.log("user", user)
                if (user && user.token) 
                    localStorage.setItem('adminUser', JSON.stringify(user));
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('adminUser');
    }
}