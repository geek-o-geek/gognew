import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from "../../services/admin-service.service"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isRemoveTemp: boolean = false
  constructor(private AdminServiceService: AdminServiceService) { }

  ngOnInit() {
    this.AdminServiceService.removeTemp.subscribe(obj =>
      this.isRemoveTemp = obj.isRemoveTemp
    )
  }

}
