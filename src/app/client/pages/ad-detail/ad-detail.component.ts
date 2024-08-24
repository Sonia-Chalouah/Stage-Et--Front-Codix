import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  adId: number;
  avatarUrl: string;
  ad: any;

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute) {
    this.adId = this.activatedRoute.snapshot.params['adId'];
  }

  ngOnInit(): void {
    this.getAdDetailsByAdId();
  }

  getAdDetailsByAdId(): void {
    this.clientService.getAdDetailsById(this.adId).subscribe(
      res => {
        console.log(res);
        this.ad = res.adDTO;
        const mimeType = res.adDTO.mimeType; // Assurez-vous que mimeType est renvoyé depuis le backend
        this.avatarUrl = `data:${mimeType};base64,${res.adDTO.retrnedImg}`; // Utilisez 'retrnedImg'
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'annonce', error);
      }
    );
  }
}
