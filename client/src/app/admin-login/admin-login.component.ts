import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AdminServiceService } from "../services/admin-service.service"
import { AdminauthService } from "../services/adminauth.service"
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthenticated: boolean

  constructor(private adminService: AdminServiceService,
    private AdminauthService: AdminauthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.adminService.removeTemplate()
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    const { username, password } = this.loginForm.value
    this.AdminauthService.login(username, password)
    .pipe(first())
    .subscribe(
        data => {
          console.log(data)
            this.isAuthenticated = true 
            this.router.navigate(["/createpost"]);
        },
        error => this.isAuthenticated = false )
      
  }

}
