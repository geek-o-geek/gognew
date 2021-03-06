import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminauthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('adminUser')) 
            return true;
        
        this.router.navigate(['/admin']);
        return false;
    }
}
