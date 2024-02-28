import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}
  // status!: boolean;
  status!: boolean;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isSignedIn = window.localStorage.getItem("isSignedIn");
    if (isSignedIn == "true") {
      this.status = true;
    } else if (!isSignedIn) {
      this.status = false;
      this.router.navigate(["/login"]);
    }
    this.authService.User.subscribe(
      user => {
        if (user) {
          console.log(user);
          this.status = true;
          this.router.navigate(["/home"]);
      }
      }
    )
    console.log(this.status);
    return this.status? true: false;
  }
}

