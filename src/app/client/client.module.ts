import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientNavbarComponent } from './pages/client-navbar/client-navbar.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { ReviewComponent } from './pages/review/review.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { BlogComponent } from './pages/blog/blog.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientNavbarComponent,
    ClientDashboardComponent,
    AdDetailComponent,
    MyBookingsComponent,
    ReviewComponent,
    ChatbotComponent,
    BlogComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzNotificationModule,
    NgxStarRatingModule,
    BsDatepickerModule.forRoot() 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajout de CUSTOM_ELEMENTS_SCHEMA ici
})
export class ClientModule { }
