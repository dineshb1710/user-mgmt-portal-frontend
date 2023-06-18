import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    // Check for request URL..
    if (httpRequest.url.includes(`${this.authenticationService.hostUrl}${environment.login}`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.hostUrl}${environment.register}`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.hostUrl}${environment.resetPassword}`)) {
      return httpHandler.handle(httpRequest);
    }
    // Append request with 'Authorization' header with token value in it.
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const httpRequestWithToken = httpRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return httpHandler.handle(httpRequestWithToken);
  }
}
