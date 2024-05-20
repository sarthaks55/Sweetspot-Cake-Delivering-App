// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.userService.userObservable.pipe(
        map(user => {
          if (user.email) {
            if (route.data['admin'] && !user.isAdmin) {
              this.router.navigate(['/']); // Redirect if not admin
              return false;
            }
            return true;
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        })
      );
    }
  }