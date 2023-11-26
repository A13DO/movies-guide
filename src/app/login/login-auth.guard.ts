import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class LoginAuthGuard {
  constructor(private router: Router, private loginService: LoginService) {}
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
    this.loginService.User.subscribe(
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

