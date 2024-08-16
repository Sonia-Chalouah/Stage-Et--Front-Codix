import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {
  constructor(private router: Router, private userStorageService: UserStorageService) {}

  // Méthode de déconnexion
  Logout(): void {
    UserStorageService.signout();
    this.router.navigate(['login']);
  }
}
