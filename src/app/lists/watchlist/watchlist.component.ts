import { Subscription, take } from 'rxjs';
import { Movie } from '../../shared/movie.module';
import { MoviesRequestsService } from '../../shared/movies-requests.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy{
  watchedIds!: number[];
  favoriteIds!: number[];
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watchlist.json";
  watchedUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watched.json";
  favoritesUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/favorites.json";
  // i need store to watchlist movies
  constructor(private requestService: MoviesRequestsService, private loginService: LoginService) {}
  watchlistMovies: any;
  Sub: Subscription = new Subscription;
  WATCHLIST = "watchlist"
  ngOnInit() {
    // ================= Get Watched Status ====================
    this.requestService.getMovies(this.watchedUrl)
    .subscribe(
      watchedMovies => {

        this.watchedIds = watchedMovies.map(obj => obj.id);
      }
    )
    // ================= Get Favorite Status ====================
    this.requestService.getMovies(this.favoritesUrl)
    .subscribe(
      favoriteMovies => {
        this.favoriteIds = favoriteMovies.map(obj => obj.id);
      }
    )
    this.Sub =
    this.requestService.getMovies(this.watchlistUrl).subscribe(
      movies => {
      this.watchlistMovies = movies;
    })
  }
  ngOnDestroy() {
    this.Sub.unsubscribe()
  }
  // subscribe to show watchlist content
}
