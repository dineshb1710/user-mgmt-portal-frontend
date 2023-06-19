import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.activeUserSessionAvailable()) {
      this.router.navigate([`${environment.login}`]);
      this.notificationService.sendNotification(
        NotificationType.INFO,
        'YOU NEED TO LOGIN TO ACCESS THIS RESOURCE !!'
      );
      return false;
    }
    return true;
  }

  private activeUserSessionAvailable(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }
}
