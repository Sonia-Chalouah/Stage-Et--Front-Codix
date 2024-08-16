import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER ='s_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    try {
      window.localStorage.setItem(USER, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        return null;
      }
    }
    return null; // Retourne null si l'utilisateur n'est pas trouvé
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    console.log('User role:', user ? user.role : 'No user');  // Ajout d'un log pour vérifier
    return user ? user.role : '';
  }
  
  static isClientLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CLIENT';
  }
  
  static isCompanyLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'COMPANY';
  }
  

  static signout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
