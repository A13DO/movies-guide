import { LinksService } from '../../../core/services/links.service';
import { MoviesRequestsService } from '../../../core/services/movies-requests.service';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie.module';
import { MoviesListComponent } from '../../../pages/home/movies-list/movies-list.component';
import { Subscription } from 'rxjs';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
// import
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit, OnChanges, OnDestroy {
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
  faStar = faStar;
  constructor(
    private router: Router,
    private requestService: MoviesRequestsService,
    private linksService: LinksService
  ) {}
  // Firebase add movies.json to add file
  startTime: any;
  endTime: any;
  // watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json"
  watchedUrl = this.linksService.watchedUrl;
  watchlistUrl = this.linksService.watchlistUrl;
  favoritesUrl = this.linksService.favoritesUrl;
  // favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json"
  // Get From FireBase
  watchedToggleClass: boolean = false;
  favoriteToggleClass: boolean = false;
  watchlistToggleClass: boolean = false;
  checkIfNotSignedIn() {
    let isSignedIn = window.localStorage.getItem('isSignedIn');
    if (!isSignedIn) {
      this.watchedToggleClass = false;
      this.watchlistToggleClass = false;
      this.favoriteToggleClass = false;
    }
  }

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
    this.checkIfNotSignedIn();
  }
  ngOnChanges(changes: SimpleChanges) {
    // Called whenever an input property changes
    for (const propName in changes) {
      if (propName == 'watchedStatus') {
        if (changes[propName].currentValue == true) {
          this.watchedToggleClass = true;
        }
      } else if (propName == 'favoriteStatus') {
        if (changes[propName].currentValue == true) {
          this.favoriteToggleClass = true;
        }
      } else if (propName == 'watchlistStatus') {
        if (changes[propName].currentValue == true) {
          this.watchlistToggleClass = true;
        }
      }
    }
    this.checkIfNotSignedIn();
  }

  mySub: Subscription = new Subscription();
  savedMovies: Movie[] = [];
  WATCHED = 'watched';
  WATCHLIST = 'watchlist';
  FAVORITE = 'favorite';

  onAddToWatched(movie: Movie) {
    let isSignedIn = window.localStorage.getItem('isSignedIn');
    if (isSignedIn == 'true') {
      // movie.isWatched = true;
      const componentName = 'watched';
      // toggle
      if (this.watchedToggleClass) {
        this.watchedToggleClass = false;
        this.requestService.deleteMovie(movie, componentName);
      } else {
        this.watchedToggleClass = true;
        // Send Http Request
        this.requestService.saveMovies(movie, this.watchedUrl, this.WATCHED);
      }
    } else if (!isSignedIn) {
      this.router.navigate(['/login']);
    }
  }
  onAddToWatchlist(movie: Movie) {
    let isSignedIn = window.localStorage.getItem('isSignedIn');
    if (isSignedIn == 'true') {
      movie.isWatchList = true;
      const componentName = 'watchlist';
      // toggle
      if (this.watchlistToggleClass) {
        this.watchlistToggleClass = false;
        this.requestService.deleteMovie(movie, componentName);
      } else if (this.watchlistToggleClass == false) {
        this.watchlistToggleClass = true;
        // Send Http Request
        this.requestService.saveMovies(
          movie,
          this.watchlistUrl,
          this.WATCHLIST
        );
      }
    } else if (!isSignedIn) {
      this.router.navigate(['/login']);
    }
  }
  onAddToFavorites(movie: Movie) {
    let isSignedIn = window.localStorage.getItem('isSignedIn');
    if (isSignedIn == 'true') {
      movie.isFavorite = true;
      const componentName = 'favorite';
      // toggle
      if (this.favoriteToggleClass) {
        this.favoriteToggleClass = false;
        this.requestService.deleteMovie(movie, componentName);
      } else {
        this.favoriteToggleClass = true;
        this.requestService.saveMovies(movie, this.favoritesUrl, this.FAVORITE);
      }
    } else if (!isSignedIn) {
      this.router.navigate(['/login']);
    }
  }
  deleteMovie(movie: Movie, componentName: string) {
    console.log(movie);
    console.log('Component Name: ' + componentName);
    // remove from
    this.requestService.deleteMovie(movie, componentName);

    // remove from page
    document.addEventListener('click', function (e) {
      if ((e.target as HTMLElement).classList.contains('delete-button')) {
        const movieCardEl = (e.target as HTMLElement).closest('.movie-card');
        var disElClasses = (movieCardEl?.childNodes[3] as HTMLElement)
          .classList;
        disElClasses.add('disable');
        console.log((movieCardEl?.childNodes[3] as HTMLElement).classList);
      }
    });
  }
  goToMoviePage() {
    this.router.navigate(['movie', this.movie.name], {
      state: { id: this.movie.id },
    });
  }
  ngOnDestroy() {
    this.mySub.unsubscribe();
  }
}
