import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../shared/movie.module';
import { MoviesRequestsService } from '../../shared/movies-requests.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  constructor(private requestService: MoviesRequestsService) {}
  mySub: Subscription = new Subscription;
  favoriteMovies: Movie[] = [];
  watchedIds!: number[];
  watchlistIds!: number[];
  favoriteIds!: number[];
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watchlist.json";
  watchedUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watched.json";
  favoritesUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/favorites.json";
  FAVORITE = "favorite"
  ngOnInit() {
    console.log('Hello From Watchlist')
    this.mySub =
    this.requestService.getMovies(this.favoritesUrl).subscribe(
      movies => {
        this.favoriteMovies = movies
    })
    // ================= Get Watched Status ====================
    this.requestService.getMovies(this.watchedUrl)
    .subscribe(
      watchedMovies => {
        this.watchedIds = watchedMovies.map(obj => obj.id);
      }
    )
    // ================= Get Watchlist Status ==================
    this.requestService.getMovies(this.watchlistUrl)
    .subscribe(
      watchlistMovies => {
        this.watchlistIds = watchlistMovies.map(obj => obj.id);
      }
    )
  }
  ngOnDestroy() {

  }
}
