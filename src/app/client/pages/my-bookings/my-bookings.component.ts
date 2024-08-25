import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookServices:any;

  constructor( private clientService: ClientService) { }


  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res=>{

      this.bookServices = res;
    })
  }

}
