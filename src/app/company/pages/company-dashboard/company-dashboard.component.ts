import { Component, OnInit } from '@angular/core';
import { CompanyserviceService } from '../../services/companyservice.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  bookings: any;

  constructor(private companyService: CompanyserviceService) {}

  ngOnInit() {
    this.getAllAdBookings();
  }

  getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe(res => {
      console.log(res);
      this.bookings = res;
    });
  }
}
