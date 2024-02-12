import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}
  isSignInMode: boolean = true;
  signInText: string = "Sign In";
  signUpText: string = "Sign Up";
  onSubmit(form: NgForm) {
    const email = form.controls['email'];
    console.log("Email: ", email.value, "Status: ", email.status);
    const password = form.controls['password'];
    console.log("Password: ", password.value, "Status: ", password.status);
    // console.log(form);
    if (this.isSignInMode) {
      this.loginService.signIn(email.value, password.value).subscribe(
        res => {
          console.log("response: ", res);
        }
      )
    } else if (!this.isSignInMode) {
      this.loginService.signUp(email.value, password.value).subscribe(
        res => {
          console.log("response: ", res);
        }
      )
    }
  }
  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;
  }
}
