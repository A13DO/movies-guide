import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesRequestsService } from '../../shared/movies-requests.service';
import { Movie } from '../../shared/movie.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit, OnDestroy{
  watchedMovies: Movie[] = []
  mySub: Subscription = new Subscription;
  watchlistIds!: number[];
  favoriteIds!: number[];
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watchlist.json";
  watchedUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watched.json";
  favoritesUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/favorites.json";
  WATCHED = "watched"

  constructor(private requestService: MoviesRequestsService) {}
  ngOnInit(){
    this.mySub = this.requestService.getMovies(this.watchedUrl).subscribe(
      movies => {
        this.watchedMovies = movies;
      }
    )
    // ================= Get Watchlist Status ==================
    this.requestService.getMovies(this.watchlistUrl)
    .subscribe(
      watchlistMovies => {
        this.watchlistIds = watchlistMovies.map(obj => obj.id);
      }
    )
    // ================= Get Favorite Status ====================
    this.requestService.getMovies(this.favoritesUrl)
    .subscribe(
      favoriteMovies => {
        this.favoriteIds = favoriteMovies.map(obj => obj.id);
      }
    )
  }
  ngOnDestroy() {
    this.mySub.unsubscribe()
  }
}
