import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  bookId: number = this.activatedRoute.snapshot.params['id'];
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      review: [null, Validators.required]
    });
  }

  giveReview(): void {
    if (this.validateForm.invalid) {
        this.notification.error('Form Error', 'Please fill out all required fields', { nzDuration: 5000 });
        return;
    }

    const reviewDTO = {
        review: this.validateForm.get('review')?.value,
        // Pas de champ rating à ajouter
    };

    this.clientService.giveReview(reviewDTO).subscribe(
        res => {
            this.notification.success('SUCCESS', 'Review posted successfully', { nzDuration: 5000 });
            this.router.navigateByUrl('client/bookings');
        },
        error => {
            console.error('Error:', error);
            this.notification.error('ERROR', `Error: ${error.message}`, { nzDuration: 5000 });
        }
    );
}

}
