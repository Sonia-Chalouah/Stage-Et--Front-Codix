import { Component, ChangeDetectorRef } from '@angular/core';
import { CompanyserviceService } from '../../services/companyservice.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.css'
})
export class AllAdsComponent {

  ads: any;

  constructor(
    private companyService: CompanyserviceService,
    private notification: NzNotificationService,
    private cdr: ChangeDetectorRef // Injecter ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId() {
    this.companyService.getAllAdsByUserId().subscribe(
      res => {
        this.ads = res;
      });
  }

  updateImg(img: string, mimeType: string): string {
    return `data:${mimeType};base64,${img}`;
  }

  deleteAd(adId: any) {
    console.log('Attempting to delete ad with ID:', adId); // Ajout du log
  
    this.companyService.deleteAd(adId).subscribe(
      res => {
        this.notification.success(
          'Succès', 
          'Annonce supprimée',
          { nzDuration: 5000 }
        );
        this.ads = this.ads.filter((ad: any) => ad.id !== adId);
      }
     
    );
  }
  
}
