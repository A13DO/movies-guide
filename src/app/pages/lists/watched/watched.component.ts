import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesRequestsService } from '../../../core/services/movies-requests.service';
import { Movie } from '../../../core/interfaces/movie.module';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/core/services/links.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit, OnDestroy{
  constructor(private requestService: MoviesRequestsService, private linksService: LinksService) {}
  watchedMovies: Movie[] = []
  mySub: Subscription = new Subscription;
  watchlistIds!: number[];
  favoriteIds!: number[];
  watchedUrl = this.linksService.watchedUrl;
  watchlistUrl = this.linksService.watchlistUrl;
  favoritesUrl = this.linksService.favoritesUrl;
  WATCHED = "watched"

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
