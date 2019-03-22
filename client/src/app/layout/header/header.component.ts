import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from "../../services/admin-service.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isRemoveTemp: boolean = false
  constructor(private AdminServiceService: AdminServiceService) { }

  ngOnInit() {
    this.AdminServiceService.removeTemp.subscribe(obj =>
      this.isRemoveTemp = obj.isRemoveTemp
    )
  }

}
