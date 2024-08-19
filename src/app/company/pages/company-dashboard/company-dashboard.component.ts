import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
})
export class CompanyDashboardComponent {
  constructor(private router: Router, private userStorageService: UserStorageService) {}

 
  Logout(): void {
    UserStorageService.signout();
    this.router.navigate(['login']);
  }
}
