import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

  ads: any = [];
  validateForm!: FormGroup;

  constructor(private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder  
  ) {}

  getAllAds(){
    this.clientService.getAllAds().subscribe(ads => {
      this.ads = ads;
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null,Validators.required ]
    });
    this.getAllAds();
  }

  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res=>{
      this.ads = res;
    })
  }

  updateImg(img: string, mimeType: string): string {
    return `data:${mimeType};base64,${img}`;
  }
  
 
}
