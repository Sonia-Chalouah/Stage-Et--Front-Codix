import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Renommez en 'styleUrls' pour utiliser un tableau
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.get('userName')!.value, this.validateForm.get('password')!.value)
        .subscribe(
          res => {
            console.log(res);
            if (UserStorageService.isClientLoggedIn) { 
              this.router.navigateByUrl('client/dashboard')
            }else if (UserStorageService.isCompanyLoggedIn){
              this.router.navigateByUrl('company/dashboard')
            }
            
          },
          error => {
            this.notification.error(
              'Login Failed',
              'Please check your credentials',
              { nzDuration: 5000 }
            );
          }
        );
    } 
  }
}
