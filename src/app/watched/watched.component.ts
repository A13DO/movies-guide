import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesRequestsService } from '../shared/movies-requests.service';
import { Movie } from '../shared/movie.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit, OnDestroy{
  watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json"
  watchedMovies: Movie[] = []
  mySub: Subscription = new Subscription;

  WATCHED = "watched"

  constructor(private requestMovies: MoviesRequestsService) {}
  ngOnInit(){
    this.mySub = this.requestMovies.getMovies(this.watchedUrl).subscribe(
      movies => {
        this.watchedMovies = movies;
      }
    )
  }
  ngOnDestroy() {
    this.mySub.unsubscribe()
  }
}
