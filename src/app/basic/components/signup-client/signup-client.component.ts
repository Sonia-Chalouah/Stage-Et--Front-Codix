import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.registerClient();
    } else {
      this.validateFormControls();
    }
  }

  private registerClient(): void {
    const signupRequestDTO = this.validateForm.value;
    this.authService.registerClient(signupRequestDTO).subscribe(
      res => {
        this.showSuccessNotification();
        this.navigateToLogin();
      },
      err => {
        this.showErrorNotification();
      }
    );
  }

  private showSuccessNotification(): void {
    this.notification.success(
      'Signup Successfully',
      'You have successfully signed up!',
      { nzDuration: 5000 }
    );
  }

  private showErrorNotification(): void {
    this.notification.error(
      'Signup Failed',
      'Signup failed. Please try again.',
      { nzDuration: 5000 }
    );
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }

  private validateFormControls(): void {
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  confirmationValidator = (control: FormGroup): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return null;
  };
}
