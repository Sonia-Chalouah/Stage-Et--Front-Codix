import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}/client/sign-up`, signupRequestDTO);
  }

  registerCompany(signupRequestDTO: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}/company/sign-up`, signupRequestDTO);
  }
}
