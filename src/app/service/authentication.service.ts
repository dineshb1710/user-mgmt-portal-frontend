import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string;
  private loggedInUserName: string;
  private hostUrl = environment.apiUrl + environment.v1_User;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.hostUrl}${environment.login}`,
      user,
      { observe: 'response' }
    );
  }

  public register(
    user: User
  ): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.hostUrl}${environment.register}`,
      user
    );
  }

  public logout(): void {
    // This method will clear the entire session for this user.
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public addUserToCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (
      this.isValidToken(this.token) &&
      this.getSubjectFromToken(this.token) != null &&
      !this.tokenExpired(this.token)
    ) {
      this.loggedInUserName = this.getSubjectFromToken(this.token);
      return true;
    }
    this.logout();
    return false;
  }

  private getSubjectFromToken(token: string): string {
    return this.jwtHelperService.decodeToken(token).sub;
  }

  private tokenExpired(token: string): boolean {
    return this.jwtHelperService.isTokenExpired(token);
  }

  private isValidToken(token: string): boolean {
    return token != null && token !== '';
  }
}
