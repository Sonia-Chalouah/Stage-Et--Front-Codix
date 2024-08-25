import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-company-navbar',
  templateUrl: './company-navbar.component.html',
  styleUrl: './company-navbar.component.css'
})
export class CompanyNavbarComponent {

  constructor(private router: Router, private userStorageService: UserStorageService) {}

 
  Logout(): void {
    UserStorageService.signout();
    this.router.navigate(['login']);
  }

}
