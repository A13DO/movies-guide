import { MoviesRequestsService } from '../../../shared/movies-requests.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/shared/movie.module';
import { MoviesListComponent } from '../movies-list.component';
import { Subscription } from 'rxjs';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// import
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnDestroy{
  @Input() movie!: Movie;
  @Input() componentName!: string;
  // with using *ngIf if the value is true the button will appear
  @Input() watchedButton: boolean = false;
  @Input() watchlistButton: boolean = false;
  @Input() favoriteButton: boolean = false;
  @Input() deleteButton: boolean = false;
  // icons
  faAdd = faPlus;
  faLove = faHeart;
  faEye = faEye;
  constructor(private router: Router,private watchlistService: MoviesRequestsService) {}
  // Firebase add movies.json to add file

  watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json"
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json"
  favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json"
  mySub: Subscription = new Subscription;
  savedMovies: Movie[] = [];
  WATCHED = "watched"
  WATCHLIST = "watchlist"
  FAVORITE = "favorite"
  onAddToWatched(movie: Movie) {
    // Send Http Request
    this.watchlistService.saveMovies(movie, this.watchedUrl, this.WATCHED)
  }
  onAddToWatchlist(movie: Movie) {
    // Send Http Request
    this.watchlistService.saveMovies(movie, this.watchlistUrl, this.WATCHLIST)
  }
  onAddToFavorites(movie: Movie) {
    // Send Http Request
    this.watchlistService.saveMovies(movie, this.favoritesUrl, this.FAVORITE)
  }
  deleteMovie(movie: Movie, componentName: string) {
    console.log(movie)
    console.log("Component Name: " + componentName)
    // remove from
    this.watchlistService.deleteMovie(movie, componentName)


    // remove from page
    document.addEventListener("click", function (e) {
      if ((e.target as HTMLElement).classList.contains('delete-button')) {
        const item = (e.target as HTMLElement).closest('.movie-card')
          console.log(item)
          item?.remove()
      }}
      )
    }
    goToMoviePage() {
      this.router.navigate(["movie", this.movie.name], {state: {id: this.movie.id}})
      console.log("Go To: " + this.movie.name + " Page")
      console.log("Go To: " + this.movie.id + " Page")
    }
  ngOnDestroy() {
    this.mySub.unsubscribe()
  }
}



// #1
// add new data base for favorites and watched

// #2
// change watchlist.service to sharedRequests.service | and make dynamic and clear

// #3
// try to add getMovies() in watchlist component and others instead of service constructor (and sure to bind the data to service to check on exists movies)

// #4
// set watched (add it's database and add requests functions and watched button)

// #5
// add deleteMovie() function
