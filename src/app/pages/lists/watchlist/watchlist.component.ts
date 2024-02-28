import { Subscription, take } from 'rxjs';
import { MoviesRequestsService } from '../../../core/services/movies-requests.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LinksService } from 'src/app/core/services/links.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy{
  constructor(private requestService: MoviesRequestsService, private linksService: LinksService) {}
  watchedIds!: number[];
  favoriteIds!: number[];
  watchedUrl = this.linksService.watchedUrl;
  watchlistUrl = this.linksService.watchlistUrl;
  favoritesUrl = this.linksService.favoritesUrl;
  // i need store to watchlist movies
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
