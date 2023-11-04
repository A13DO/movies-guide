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
export class MovieCardComponent implements OnInit, OnDestroy{
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
  constructor(private router: Router,private requestService: MoviesRequestsService) {}
  // Firebase add movies.json to add file

  watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json"
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json"
  favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json"
  // Get From FireBase
  watchedToggleClass: boolean = false;
  favoriteToggleClass: boolean = false;
  watchlistToggleClass: boolean = false;
  // ================= Testing - Start =================
  ngOnInit(): void {
  //   // Get Watched Status
  //   this.requestService.getMovies(this.watchedUrl)
  //   .subscribe(
  //     watchedMovies => {
  //       for (let movie of watchedMovies) {
  //         console.log(movie.movieStatus)
  //         if (movie.movieStatus == true) {
  //           this.watchedToggleClass = true;
  //         }
  //       }
  //     }
  //   )
  //   // Get Watchlist Status
  //   this.requestService.getMovies(this.watchlistUrl)
  //   .subscribe(
  //     watchlistMovies => {
  //       for (let movie of watchlistMovies) {
  //         if (movie.movieStatus == true) {
  //           this.watchlistToggleClass = true;
  //         }
  //       }
  //     }
  //   )
  //   // Get Favorite Status
  //   this.requestService.getMovies(this.favoritesUrl)
  //   .subscribe(
  //     favoriteMovies => {
  //       for (let movie of favoriteMovies) {
  //         if (movie.movieStatus == true) {
  //           this.favoriteToggleClass = true;
  //         }
  //       }
  //     }
  //   )
  }
  // ----- no delete, movie card or movies-list (where i fetch movie)
  // ================= Testing - End ====================


  mySub: Subscription = new Subscription;
  savedMovies: Movie[] = [];
  WATCHED = "watched"
  WATCHLIST = "watchlist"
  FAVORITE = "favorite"

  onAddToWatched(movie: Movie) {
    // Send Http Request
    this.requestService.saveMovies(movie, this.watchedUrl, this.WATCHED);
    // toggle icon
    const componentName = "watched";

    (this.watchedToggleClass? (this.watchedToggleClass = false, this.requestService.deleteMovie(movie, componentName)) : this.watchedToggleClass = true); // error the movie deletes wherever the movie
  }
  onAddToWatchlist(movie: Movie) {
    // Send Http Request
    this.requestService.saveMovies(movie, this.watchlistUrl, this.WATCHLIST);
    // toggle icon
    const componentName = "watchlist";
    (this.watchlistToggleClass? (this.watchlistToggleClass = false, this.requestService.deleteMovie(movie, componentName)) : this.watchlistToggleClass = true);
    // on-click => add
    // off-click => remove (when reload or at same time)
    // --- add when this.watchlistToggleClass = false, (delete movie)
  }
  onAddToFavorites(movie: Movie) {
    // Send Http Request
    this.requestService.saveMovies(movie, this.favoritesUrl, this.FAVORITE);
    // toggle icon
    const componentName = "favorite";
    (this.favoriteToggleClass? (this.favoriteToggleClass = false, this.requestService.deleteMovie(movie, componentName)) : this.favoriteToggleClass = true);
  }
  deleteMovie(movie: Movie, componentName: string) {
    console.log(movie)
    console.log("Component Name: " + componentName)
    // remove from
    this.requestService.deleteMovie(movie, componentName)

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
      // [routerLink]="['/movie', movie.name]" [state]="{id: movie.id}"
      console.log("Go To: " + this.movie.name + " Page")
      console.log("Go To: " + this.movie.id + " Page")
    }
  ngOnDestroy() {
    this.mySub.unsubscribe()
  }
}

