import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/services/stoarge/user-stoarge.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  adId: number;
  avatarUrl: string;
  ad: any;
  validateForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.adId = this.activatedRoute.snapshot.params['adId'];
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]]
    });
    this.getAdDetailsByAdId();
  }

  getAdDetailsByAdId(): void {
    this.clientService.getAdDetailsById(this.adId).subscribe(
      res => {
        this.ad = res.adDTO;
        const mimeType = res.adDTO.mimeType;
        this.avatarUrl = `data:${mimeType};base64,${res.adDTO.retrnedImg}`;
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'annonce', error);
      }
    );
  }

  bookService(): void {
    if (this.validateForm.valid) {
        const bookServiceDTO = {
            bookDate: this.validateForm.get('bookDate')?.value,
            adId: this.adId,
            userId: UserStorageService.getUserId(),
        };

        this.clientService.bookService(bookServiceDTO).subscribe(
            res => {
                this.notification.success(
                    'SUCCESS',
                    'Request posted successfully',
                    { nzDuration: 5000 }
                );
                this.router.navigateByUrl('/client/Bookings');
            },
            error => {
                console.error('Erreur lors de la réservation', error);
            }
        );
    } else {
        console.error('Formulaire invalide');
    }
  }
}
