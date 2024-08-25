import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  bookId: number = this.activatedRoute.snapshot.params['id'];
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      review: [null, Validators.required],
      rating: [null, Validators.required]
    });
  }

  giveReview(){
    const reviewDTO = {
      rating: this.validateForm.get('rating').value,
      review: this.validateForm.get('review').value,
      userId: UserStorageService.getUserId(),
      bookId: this.bookId
    }

    this.clientService.giveReview(reviewDTO).subscribe(res =>{
      this.notification
      .success(
        'SUCCESS',
        'Reviewr  posted successfully',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('client/bookings');
    },
     error => {
       this.notification
      .error(
        'ERROR',
        `${error.message}`,
        { nzDuration: 5000 }
      );
       
     })
  }

}
