import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './shared/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { HttpClientModule } from '@angular/common/http';
import { SigupCompanyComponent } from './basic/components/sigup-company/sigup-company.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupClientComponent,
    ClientDashboardComponent,
    CompanyDashboardComponent,
    NotfoundComponent,
    SignupComponent,
    SigupCompanyComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzNotificationModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
