import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyserviceService } from '../../services/companyservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.css']
})
export class UpdateAdComponent {
  adId: any = this.activatedRoute.snapshot.params['id'];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  validateForm: FormGroup;
  existingImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyserviceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getAdById();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateAd(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.companyService.updateAd(this.adId, formData).subscribe(
      res => {
        this.notification.success('Success', 'Ad updated successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads');
      },
      err => {
        this.notification.error('Error', `${err.error}`, { nzDuration: 5000 });
      }
    );
  }

  getAdById(): void {
    this.companyService.getAdById(this.adId).subscribe(
      res => {
        this.validateForm.patchValue(res);
        if (res.returnedImage) {
          this.existingImage = 'data:image/png;base64,' + res.returnedImage;
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
