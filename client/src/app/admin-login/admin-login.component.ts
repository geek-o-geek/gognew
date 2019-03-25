import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AdminServiceService } from "../services/admin-service.service"
import { AdminauthService } from "../services/adminauth.service"
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthenticated: boolean = true

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

    this.loginForm.valueChanges.subscribe(res => {
      this.isAuthenticated = true 
    })
  }

  onSubmit(){
    const { username, password } = this.loginForm.value
    this.AdminauthService.login(username, password)
    .pipe(first())
    .subscribe(
        data => {
            this.isAuthenticated = true 
            this.router.navigate(["/createpost"]);
        },
        error => {
          console.log(error)
          this.isAuthenticated = false 
        })
  }

}
