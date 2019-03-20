import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MailpostService } from '../services/mailpost.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  name: any;
  subject: any;
  email: any;
  user_msg = ''
  constructor(private formBuilder: FormBuilder, private mp: MailpostService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/)
        ])],
      subject: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])]
    });

    this.contactForm.valueChanges.subscribe( (obj)=>{
      this.name = obj.name;
      this.subject = obj.subject;
      this.email = obj.email;
    });
  }

  onSubmit(event){
    const data = {
      "name": this.name,
      "subject": this.subject,
      "email": this.email
    }; 

    this.contactForm.reset();

    this.mp.mailPost(data)
    .subscribe(res => {
      
    })

    this.user_msg = 'Form submitted successfully'
        
        setTimeout(()=>{
          this.user_msg = ''
        }, 5000)
  }

}
