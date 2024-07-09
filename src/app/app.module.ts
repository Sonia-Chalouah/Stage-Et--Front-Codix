import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
