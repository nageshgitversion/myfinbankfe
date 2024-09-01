import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null); // Observable for user info
  user$ = this.userSubject.asObservable(); 

  constructor(private http: HttpClient, private router: Router) {
    const user = this.getUser();
    this.userSubject.next(user);
   }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:8080/api/auth/login`, { username, password });
  }

  register(user: User): Observable<any> {
    return this.http.post(`http://localhost:8080/api/auth/register`,  user);
  }

  

  logout(): void {
    this.userSubject.next(null); // Clear user info
    localStorage.removeItem('user'); // Clear from local storage
  }

  setUser(user: any): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user)); // Store user info
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getRole(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return '';
  }
}
