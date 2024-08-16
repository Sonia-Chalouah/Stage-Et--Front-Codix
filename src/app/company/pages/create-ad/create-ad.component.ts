import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyserviceService } from '../../services/companyservice.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css'
})
export class CreateAdComponent {

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm: FormGroup;


  constructor( private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router, 
    private companyService: CompanyserviceService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serviceName: [null , [Validators.required]],
      description: [null , [Validators.required]],
      price: [null , [Validators.required]],
    });
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  postAd(){
    const formData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.companyService.postAd(formData).subscribe(
      res => {
        this.notification.success(
          'success',
          'Publication réussie', 
          {nzDuration: 5000});
        this.router.navigateByUrl('/company/ads');
      },
      err => {
        this.notification.error(
          'error', 
          `${err.error}`,
          {nzDuration: 5000});
      }
    );
  }
}
