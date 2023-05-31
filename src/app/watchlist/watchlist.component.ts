import { Subscription } from 'rxjs';
import { Movie } from '../shared/movie.module';
import { MoviesRequestsService } from '../shared/movies-requests.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy{
  // i need store to watchlist movies
  constructor(private watchlistService: MoviesRequestsService) {}
  watchlistMovies: any;
  mySub: Subscription = new Subscription;
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json"
  WATCHLIST = "watchlist"
  ngOnInit() {
    console.log('Hello From Watchlist')
    this.mySub =
    this.watchlistService.getMovies(this.watchlistUrl).subscribe(
      movies => {
        this.watchlistMovies = movies
      console.log(movies)
    })
  }
  ngOnDestroy() {
    this.mySub.unsubscribe()
  }
  // subscribe to show watchlist content
}
