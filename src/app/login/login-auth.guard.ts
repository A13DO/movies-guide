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
    let localStatus = window.localStorage.getItem("isSignedIn");
    if (localStatus == "true") {
      this.status = true;
      // this.router.navigate(["/home"]);
    } else if (localStatus == "false") {
      this.status = false;
      this.router.navigate(["/login"]);
    }
    this.loginService.User.subscribe(
      user => {
        if (user) {
          console.log(user);
          this.status = true;
          this.router.navigate(["/home"]);
        // return true;
      }
      //  else {
      //     this.status = false;
      //     this.router.navigate(["/login"]);
      //   // return false;
      // }
      }
    )
    console.log(this.status);
    return this.status? true: false;
    // return this.loginService.User.pipe(map( user => {
    //   if (user) {
    //     this.router.navigate(["/home"]);
    //     return true;
    //   } else {
    //     this.router.navigate(["/login"]);
    //     return false;
    //   }
    //   }
    // ))


    // if(window.localStorage.getItem("isSignedIn") == "true") {
    //   this.status = true;
    // }
    // return this.status;
  }
}

// .pipe(map(
//   if (isUser) {
//     return true
//   }
// ))

// export class AuthGuard {

//   constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }
//   canActivate():
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (!this.authService.isLoggedIn()) {
//       this.toastr.info('Please Log In!');
//       this.router.navigate(['/auth']);
//       return false;
//     }
//     // logged in, so return true
//     this.authService.isLoggedIn();
//     return true;
//   }
// }
