import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // Ajoutez ceci
import { CompanyserviceService } from '../../services/companyservice.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.css'
})
export class AllAdsComponent {

  ads: any;

  constructor(
    private companyService: CompanyserviceService,
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
  
}
