import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.css'
})
export class ClientNavbarComponent {

  constructor(private router: Router, private userStorageService: UserStorageService) {}

  
  Logout(): void {
    UserStorageService.signout();
    this.router.navigate(['login']);
  }

}
