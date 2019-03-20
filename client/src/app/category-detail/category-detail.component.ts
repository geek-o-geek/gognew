import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '../services/search-service.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input() topicName: string;
  queryobj: any = {};
  searchlist: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchServiceService) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.queryobj = {...params}
      
        if(!this.queryobj.params.topic)
          this.router.navigate(['/home']);
        else if(this.queryobj.params.topic)
          this.opentopic(this.queryobj.params.topic);  
      });
  }

  opentopic(post){
     this.searchService.search(post)
     .subscribe(res => {
      const response: any = res
      this.searchlist = response;
    })
  }

}
