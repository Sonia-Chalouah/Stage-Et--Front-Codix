import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import { CompanyNavbarComponent } from './pages/company-navbar/company-navbar.component';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  declarations: [
    CompanyComponent,
    CreateAdComponent,
    CompanyDashboardComponent,
    AllAdsComponent,
    UpdateAdComponent,
    CompanyNavbarComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzNotificationModule,
    NzTableModule,
  ]
})
export class CompanyModule { }
