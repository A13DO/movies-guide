import { MoviesRequestsService } from '../../../shared/movies-requests.service';
import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/shared/movie.module';
import { MoviesListComponent } from '../movies-list.component';
import { Subscription } from 'rxjs';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit, OnChanges,OnDestroy{
  @Input() movie!: Movie;
  @Input() componentName!: string;
  // with using *ngIf if the value is true the button will appear
  @Input() watchedButton: boolean = false;
  @Input() watchlistButton: boolean = false;
  @Input() favoriteButton: boolean = false;
  @Input() deleteButton: boolean = false;
  @Input() watchedStatus!: boolean;
  @Input() favoriteStatus!: boolean;
  @Input() watchlistStatus!: boolean;
  // icons
  faAdd = faPlus;
  faLove = faHeart;
  faEye = faEye;
  constructor(private router: Router, private requestService: MoviesRequestsService, private http: HttpClient){}
  // Firebase add movies.json to add file
  startTime: any;
  endTime: any;
  watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json"
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json"
  favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json"
  // Get From FireBase
  watchedToggleClass: boolean = false;
  favoriteToggleClass: boolean = false;
  watchlistToggleClass: boolean = false;


  ngOnInit(): void {
  if (this.watchedStatus == true) {
    this.watchedToggleClass = true;
  }
  if (this.favoriteStatus == true) {
    this.favoriteToggleClass = true;
  }
  if (this.watchlistStatus == true) {
    this.watchlistToggleClass = true;
  }
  }
  ngOnChanges(changes: SimpleChanges) {
    // Called whenever an input property changes
    for (const propName in changes) {
      if (propName == "watchedStatus") {
        if (changes[propName].currentValue == true) {
          this.watchedToggleClass = true;
        }
      } else if (propName == "favoriteStatus") {
        if (changes[propName].currentValue == true) {
          this.favoriteToggleClass = true;
        }
      } else if (propName == "watchlistStatus") {
        if (changes[propName].currentValue == true) {
          this.watchlistToggleClass = true;
        }
      }
    }
  }

  mySub: Subscription = new Subscription;
  savedMovies: Movie[] = [];
  WATCHED = "watched"
  WATCHLIST = "watchlist"
  FAVORITE = "favorite"

  onAddToWatched(movie: Movie) {
    movie.isWatched = true;
    console.log(movie);
    // Send Http Request
    this.requestService.saveMovies(movie, this.watchedUrl, this.WATCHED);
    // toggle icon
    const componentName = "watched";
    // this.toastr.success(`${movie.name} Added To Watched List!`);
    (this.watchedToggleClass? (this.watchedToggleClass = false, this.requestService.deleteMovie(movie, componentName)) : this.watchedToggleClass = true); // error the movie deletes wherever the movie
  }
  onAddToWatchlist(movie: Movie) {
    movie.isWatchList = true;
    console.log(movie);
    // Send Http Request
    this.requestService.saveMovies(movie, this.watchlistUrl, this.WATCHLIST);
    // toggle icon
    const componentName = "watchlist";
    (this.watchlistToggleClass? (this.watchlistToggleClass = false, this.requestService.deleteMovie(movie, componentName)) : this.watchlistToggleClass = true);

  }
  onAddToFavorites(movie: Movie) {
    movie.isFavorite = true;
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
        const movieCardEl = (e.target as HTMLElement).closest('.movie-card');
        var disElClasses = (movieCardEl?.childNodes[3] as HTMLElement).classList;
        disElClasses.add("disable")
          console.log((movieCardEl?.childNodes[3] as HTMLElement).classList)
      }
    }
      )
    }
    goToMoviePage() {
      this.router.navigate(["movie", this.movie.name], {state: {id: this.movie.id}})
    }
    ngOnDestroy() {
      this.mySub.unsubscribe()
    }
}

