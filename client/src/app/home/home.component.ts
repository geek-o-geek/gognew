import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';      
import { SearchbarService } from '../services/searchbar.service';    

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  search_term: any;
  searchlist: any = [];
  noresult: boolean = false
  constructor(private searchService: SearchbarService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      q: [null, Validators.required]  
    });

    this.searchForm
          .valueChanges
          .pipe(
            debounceTime(400),
            distinctUntilChanged()
          )
          .subscribe(result => { 
              const {q} = result;
              this.search_term = q;
          });  
  }

  onSubmit(){
    this.searchService.search(this.search_term).subscribe(res => { console.log(res)
      this.searchlist = res
    }, err => this.noresult = true)
  }

}
