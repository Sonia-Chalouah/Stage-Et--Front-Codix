import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStorageService } from '../../basic/services/stoarge/user-stoarge.service';

const BASIC_URL = 'http://localhost:8081/';
const CHATBOT_URL = 'http://127.0.0.1:8000/api/chatbot';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://127.0.0.1:8000/api/chatbot';
  private apiUrls = `${BASIC_URL}api/client/review`;

  constructor(private http: HttpClient) { }

  getAllAds(): Observable<any> {
    return this.http.get(`${BASIC_URL}api/client/ads`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  searchAdByName(name: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/client/search/${name}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAdDetailsById(adId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/client/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  bookService(bookDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}api/client/book-service`, bookDTO, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getMyBookings(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}api/client/my-bookings/${userId}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  giveReview(reviewDTO: any): Observable<any> {
    const token = UserStorageService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrls, reviewDTO, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  sendMessageToChatbot(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken();
    let authHeaders = new HttpHeaders();
    if (token) {
      authHeaders = authHeaders.set('Authorization', `Bearer ${token}`);
    }
    return authHeaders;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
