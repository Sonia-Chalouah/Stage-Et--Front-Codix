import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../stoarge/user-stoarge.service';

const BASIC_URL = 'http://localhost:8081';
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isCompanyLoggedIn() {
    throw new Error('Method not implemented.');
  }
  isClientLoggedIn() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient,
    private userStoargeService: UserStorageService
  ) { }

  registerClient(signupRequestDTO: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<any>(`${BASIC_URL}/client/sign-up`, signupRequestDTO, { headers });
  }

  registerCompany(signupRequestDTO: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<any>(`${BASIC_URL}/company/sign-up`, signupRequestDTO, { headers });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${BASIC_URL}/authenticate`, { username, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log(res.body);
          this.userStoargeService.saveUser(res.body);
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
          console.log(bearerToken);
          this.userStoargeService.saveToken(bearerToken);
          return res;
        })
      );
  }
}
