import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hostUrl = environment.apiUrl + environment.v1_User;

  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.get<User[]>(
      `${this.hostUrl}${environment.getUsers}`
    );
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.httpClient.post<User | HttpErrorResponse>(
      `${this.hostUrl}${environment.addUser}`,
      formData
    );
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.httpClient.put<User | HttpErrorResponse>(
      `${this.hostUrl}${environment.updateUser}`,
      formData
    );
  }

  public findByUsername(
    username: string
  ): Observable<User | HttpErrorResponse> {
    return this.httpClient.get<User | HttpErrorResponse>(
      `${this.hostUrl}${environment.findByUsername}${username}`
    );
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse> {
    return this.httpClient.delete<CustomHttpResponse>(
      `${this.hostUrl}${environment.deleteUser}${userId}`
    );
  }

  public resetPassword(formData: FormData): Observable<CustomHttpResponse> {
    return this.httpClient.post<CustomHttpResponse>(
      `${this.hostUrl}${environment.resetPassword}`,
      formData
    );
  }

  public updateProfileImage(
    formData: FormData
  ): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.httpClient.put<User>(
      `${this.hostUrl}${environment.updateProfileImage}`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    return JSON.parse(localStorage.getItem('users'));
  }

  public createFormData(
    loggedInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.set('currentUsername', loggedInUsername);
    formData.set('firstName', user.firstName);
    formData.set('lastName', user.lastName);
    formData.set('username', user.username);
    formData.set('email', user.email);
    formData.set('role', user.role);
    formData.set('profileImage', profileImage);
    formData.set('isActive', JSON.stringify(user.isActive));
    formData.set('isLocked', JSON.stringify(user.isLocked));
    return formData;
  }
}
