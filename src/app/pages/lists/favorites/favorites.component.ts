import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../../core/interfaces/movie.module';
import { MoviesRequestsService } from '../../../core/services/movies-requests.service';
import { LinksService } from 'src/app/core/services/links.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  constructor(private requestService: MoviesRequestsService, private linksService: LinksService) {}
  mySub: Subscription = new Subscription;
  favoriteMovies: Movie[] = [];
  watchedIds!: number[];
  watchlistIds!: number[];
  favoriteIds!: number[];
  watchedUrl = this.linksService.watchedUrl;
  watchlistUrl = this.linksService.watchlistUrl;
  favoritesUrl = this.linksService.favoritesUrl;
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
