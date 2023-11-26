import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";

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
export class LoginService {
  [x: string]: any;
  public isSignedIn: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public User = new BehaviorSubject<any>(null);

  constructor(private router: Router, private http: HttpClient) {}


  signIn(email: string, password: string) {
    // APi SignIN
    return this.http
    .post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxx0R6kyNn3v7u7l35lAwrWis8mv5fkMQ', {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      tap(res => {
        window.localStorage.setItem("isSignedIn", "true");
        this.User.next(res);
        this.router.navigate(["/home"]);
        window.location.reload()
        }
      )
    )

  }
  signOut() {
    signOut(auth).then(() => {
      this.isSignedIn.next(false);
      window.localStorage.removeItem("isSignedIn");
      window.location.reload()
    }
    ).catch()
  }
}
