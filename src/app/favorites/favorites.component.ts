import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../shared/movie.module';
import { MoviesRequestsService } from '../shared/movies-requests.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  constructor(private watchlistService: MoviesRequestsService) {}
  mySub: Subscription = new Subscription;
  favoriteMovies: Movie[] = [];
  favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json"
  FAVORITE = "favorite"
  ngOnInit() {
    console.log('Hello From Watchlist')
    this.mySub =
    this.watchlistService.getMovies(this.favoritesUrl).subscribe(
      movies => {
        this.favoriteMovies = movies
      console.log(movies)
    })
  }
  ngOnDestroy() {

  }
}
