import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchingpostService } from '../services/fetchingpost.service'; 

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {

  post: string;
  heading: string = "";
  tags: string = "";
  queryobj: any = {};
  postcontent: any = "";
  topic_flag: boolean;
  topicName: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private Fetchingpost: FetchingpostService) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.queryobj = {...params}
      
        if(!this.queryobj.params.post && !this.queryobj.params.topic)
          this.router.navigate(['/home']);
        if(this.queryobj.params.topic && this.queryobj.params.id){
          let obj = {
            topic: this.queryobj.params.topic,
            id: this.queryobj.params.id
          }
          this.openPost(obj);
        } 
        else if(this.queryobj.params.topic)
          this.opentopic(this.queryobj.params.topic);  
      });
  }

  openPost(obj){ 
    this.topic_flag = false;
    this.Fetchingpost.fetchPost(obj) 
    .subscribe( data => {
      const res: any = data;
      
      const {content, heading, tags} = res;
      this.postcontent = content
      this.heading = this.ucfirst(heading);
      this.tags = tags;
    }, err => console.log(err))
  }

  opentopic(post){
    this.topic_flag = true;
    this.topicName = post;
  }

  ucfirst(str): string{
    return str.charAt(0).toUpperCase() + str.slice(1); 
  }

}
