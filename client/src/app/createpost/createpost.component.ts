import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CreatepostService } from '../services/createpost.service'

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  createpostForm: FormGroup;
  postobj: any = "";
  msg: any = ""

  constructor(private formBuilder: FormBuilder, private createPost: CreatepostService) { }

  ngOnInit() {
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

  onSubmit(e){
    this.createpostForm.reset();
    this.createPost
    .createPost(this.postobj)
    .subscribe(res =>{
      this.msg = res
    }, err => console.log(err))
  }

}
