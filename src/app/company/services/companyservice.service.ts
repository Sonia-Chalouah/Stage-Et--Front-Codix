import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/stoarge/user-stoarge.service';

const BASIC_URL = 'http//localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {

  constructor(private http : HttpClient) { }

  postAd(adDTO: any) : Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.post( BASIC_URL + `api/company/ad/${userId}`, adDTO,{
      headers: this.createAuthorizationHeader()
    } );
  }

  createAuthorizationHeader() : HttpHeaders{
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', 
      'Bearer ' 
      + UserStorageService.getToken());
  }
}
