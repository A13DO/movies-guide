import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode'; // Change import statement

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  uid: any;
  watchedUrl!: string; // Declare these variables
  watchlistUrl!: string;
  favoritesUrl!: string;

  constructor() {
    const idToken = window.localStorage.getItem("idToken");
    if (idToken){
      this.uid = jwtDecode(idToken).sub;
      this.watchedUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/watched.json`;
      this.watchlistUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/watchlist.json`;
      this.favoritesUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/favorites.json`;
    }
  }
}
