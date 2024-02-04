import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";



@Injectable({
  providedIn: "root"
})
export class SignedInGuard {
  constructor(private router: Router) {}
  status!: boolean;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isSignedIn = window.localStorage.getItem("isSignedIn");
    if (isSignedIn == "true") {
      this.status = false;
      this.router.navigate(["/home"])
    } else if (!isSignedIn) {
      this.status = true;
    }
    return this.status;
  }
}
