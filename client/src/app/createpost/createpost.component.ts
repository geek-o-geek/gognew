import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CreatepostService } from '../services/createpost.service'
import { AdminauthService } from '../services/adminauth.service'
import { Router } from '@angular/router';
import { AdminServiceService } from "../services/admin-service.service"

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  createpostForm: FormGroup;
  postobj: any = "";
  msg: any = ""

  constructor(private adminService: AdminServiceService,
    private formBuilder: FormBuilder, 
    private AdminauthService: AdminauthService,
    private router: Router,
    private createPost: CreatepostService) { }

  ngOnInit() {
    this.adminService.removeTemplate()
    this.createpostForm = this.formBuilder.group({
      heading: ['', Validators.required],
      tags: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.createpostForm.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe( obj => {
      this.postobj = obj
    });
  }

  onSubmit(){
    this.createpostForm.reset();
    this.createPost
    .createPost(this.postobj)
    .subscribe(res =>{
      this.msg = res
    }, err => console.log(err))
  }

  logout(){
    this.AdminauthService.logout()
    this.router.navigateByUrl('/admin');
  }

}
