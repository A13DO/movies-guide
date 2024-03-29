import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, map, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { jwtDecode } from "jwt-decode";

export interface AuthResponseData  {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  uid?: string;
}
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxx0R6kyNn3v7u7l35lAwrWis8mv5fkMQ",
  authDomain: "movies-guide-eb5a7.firebaseapp.com",
  databaseURL: "https://movies-guide-eb5a7-default-rtdb.firebaseio.com",
  projectId: "movies-guide-eb5a7",
  storageBucket: "movies-guide-eb5a7.appspot.com",
  messagingSenderId: "801538417351",
  appId: "1:801538417351:web:0eb0f641be5bd5047b54e2",
  measurementId: "G-LS9YJH4EQ9"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  public isSignedIn: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public User = new BehaviorSubject<any>(null);

  constructor(private router: Router, private http: HttpClient) {}
  expirationTime: any;
  signUp(email: string, password: string) {
    // APi SignIN
    return this.http
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxx0R6kyNn3v7u7l35lAwrWis8mv5fkMQ', {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      tap(res => {
        this.expirationTime = +res.expiresIn * 1000;
        let uid = jwtDecode(res.idToken);
        res.uid = uid.sub;
        this.User.next(res);
        window.localStorage.setItem("expiresIn", this.expirationTime);
        window.localStorage.setItem("isSignedIn", "true");
        window.localStorage.setItem("idToken", res.idToken);
        // this.setLogoutTimer()
        this.router.navigate(["/home"]);
        window.location.reload()
        }),
      catchError(err => {
        let errorMessage = 'An unknown error occurred';
        if (err.error.code === 'INVALID_LOGIN_CREDENTIALS') {
          errorMessage = 'Invalid email or password';
        } else if (err.error.code === 'INVALID_EMAIL') {
          errorMessage = 'Invalid email';
        } else if (err.error.code === 'MISSING_PASSWORD') {
          errorMessage = 'Invalid password';
        }
        return throwError(() => errorMessage);
      })
    )
  }
  // saveUserName(user_id: string) {
  //   this.http.post<string>(`https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${user_id}`, '')
  // }

  signIn(email: string, password: string) {
    // APi SignIN
    return this.http
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxx0R6kyNn3v7u7l35lAwrWis8mv5fkMQ', {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      tap(res => {
        this.expirationTime = +res.expiresIn * 1000;
        let uid = jwtDecode(res.idToken);
        res.uid = uid.sub;
        this.User.next(res);
        window.localStorage.setItem("expiresIn", this.expirationTime);
        window.localStorage.setItem("isSignedIn", "true");
        window.localStorage.setItem("idToken", res.idToken);
        // this.setLogoutTimer()
        this.router.navigate(["/home"]);
        window.location.reload()
        }
      ),
      catchError(err => {
        let errorMessage = 'An unknown error occurred';
        console.log("AC ERROR", err.error.error.message);
        if (err.error.error.message === 'INVALID_LOGIN_CREDENTIALS') {
          errorMessage = 'Invalid email or password';
        } else if (err.error.error.message === 'INVALID_EMAIL') {
          errorMessage = 'Invalid email';
        } else if (err.error.error.message === 'MISSING_PASSWORD') {
          errorMessage = 'Invalid password';
        }
        return throwError(() => errorMessage);
      })
    )
  }
  signOut() {
    signOut(auth).then(() => {
      this.isSignedIn.next(false);
      window.localStorage.removeItem("isSignedIn");
      window.localStorage.setItem("idToken", "");
      window.localStorage.setItem("expiresIn", "0");
      this.clearLogoutTimer()
      // window.location.reload()
    }
    ).catch()
  }

  private tokenExpirationTimer: any;

  // tokenExpirationTimer
  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      console.log("LOGOUT!!");
      this.signOut();
    }, expirationDuration);
  }
  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}

// const admin = require('firebase-admin');
// const serviceAccount = require('path/to/your/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-project-id.firebaseio.com',
// });

// const uid = 'some-uid'; // User's unique identifier
// const additionalClaims = {
//   premiumAccount: true,
// };

// // Set the expiration time (e.g., 1 hour from now)
// const expirationTimeSeconds = Math.floor(Date.now() / 1000) + 3600; // 3600 seconds = 1 hour

// admin.auth().createCustomToken(uid, additionalClaims)
//   .then((customToken) => {
//     // Send the custom token to the client along with the expiration time
//     const responseData = {
//       customToken,
//       expirationTime: expirationTimeSeconds,
//     };
//     // Send responseData to the client
//   })
//   .catch((error) => {
//     console.error('Error creating custom token:', error);
//   });
