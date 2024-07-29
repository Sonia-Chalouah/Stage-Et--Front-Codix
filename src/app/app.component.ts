import { Component } from '@angular/core';
import { UserStoargeService } from './basic/services/stoarge/user-stoarge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stage-ete-2024-front';

  isClientLoggedIn: boolean = UserStoargeService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStoargeService.isCompanyLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isClientLoggedIn = UserStoargeService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStoargeService.isCompanyLoggedIn();
    });
  }

  logout() {
    UserStoargeService.signout();
    this.router.navigate(['login']);
  }
}
