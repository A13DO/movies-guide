import { MoviesRequestsService } from './../shared/movies-requests.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.module';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {
  highlight: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: MoviesRequestsService,
    private sanitizer: DomSanitizer
  ) {}
  faAdd = faPlus;
  faLove = faHeart;
  faEye = faEye;
movie!: Movie;
movieInfo: any = [];
directorName!: string;
movieCast: any = [];
movieCrew: any = [];
movieImages: any = [];
recommendedMovies: Movie[] = [];
fullTrailerLink: any;
embedLink: any;
MovieName!: string;
MovieId!: string;
trailerLink: string = "https://www.youtube.com/watch?v=";
posterLink: string = "https://image.tmdb.org/t/p/w220_and_h330_face/";
fullSPosterlink: string = "https://image.tmdb.org/t/p/w500/";
backdropLink: string = "https://www.themoviedb.org/t/p/original/";
posterImage!: string;
filmPoster!: any;
modal!: any;
modalImage!: any;
exitButton!: any;
WATCHED = "watched"
WATCHLIST = "watchlist"
FAVORITE = "favorite"
watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json"
watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json"
favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json"

// -----------
currentMovie: any = {};
// Get From FireBase
watchedToggleClass!: boolean;
favoriteToggleClass!: boolean;
watchlistToggleClass!: boolean;
ngOnInit(): void {


  // http://localhost:4200/movie/drive
  // #name
  this.MovieName = this.route.snapshot.params['movie']; // drive
  // window.history.state
  // #id
  const params = window.history.state;
  this.MovieId = params.id;

  console.log(this.MovieId)

  // to get details Name => Id    // GetMovieDetails(Id)
  this.requestService.getMovieDetails(this.MovieId)
  .subscribe(
    movieDetails => {
      // fix the image link
      this.fullSPosterlink = this.fullSPosterlink + movieDetails.poster_path;
      console.log(movieDetails)
      movieDetails.poster_path = this.posterLink + movieDetails.poster_path;
      movieDetails.backdrop_path = this.backdropLink + movieDetails.backdrop_path;
      this.movieInfo = movieDetails;
      console.log(movieDetails)
      // assgin movie to currentMovie: Movie control buttons (watched, favorites, watchlist);
      this.currentMovie.name = movieDetails.title;
      this.currentMovie.id = movieDetails.id;
      this.currentMovie.overview = movieDetails.overview;
      this.currentMovie.rating = movieDetails.vote_average;
      this.currentMovie.year = (new Date(movieDetails.release_date)).getFullYear().toString();
      this.currentMovie.posterimagePath = movieDetails.poster_path;
      console.log(this.currentMovie)
    }
  )
  this.requestService.getMovieCredits(this.MovieId)
  .subscribe(
    creditsResponse => {
      this.movieCast = creditsResponse.cast;
      this.movieCrew = creditsResponse.crew;
      console.log(this.movieCast);
      // Get the cast
      // for (let person of creditsResponse.cast) {
      //   console.log(`${person.name} as ${person.character}`)
      // }
      // Get the Director
      for (let person of creditsResponse.crew) {
        if (person.job ==  "Director") {
          this.directorName = person.name;
          console.log(person.name)
        }
      }
      // job = "Director"
    }
  )
  this.requestService.getMovieRecommendations(this.MovieId)
  .subscribe(
    recMovies => {
      for (let movie of recMovies.results) {
        if (movie.poster_path !== null) {
        this.recommendedMovies.push({
          name: movie.title,
          id: movie.id,
          overview: movie.overview,
          year: movie.release_date,
          posterimagePath: this.posterLink + movie.poster_path,
          rating: movie.vote_average
        })
      }
    }
    console.log(recMovies.results)
    }
  )
  this.filmPoster = document.querySelector('.poster');
  this.modal = document.querySelector('.modal');
  this.modalImage = document.querySelector('.modal-image');
  this.exitButton = document.querySelector('.exit-button');

    this.filmPoster.addEventListener('click', () => {
      this.modal.style.display = 'flex';
    });
  this.modal.addEventListener('click', (event: { target: any; }) => {
    if (event.target === this.modal || event.target === this.exitButton) {
      this.modal.style.display = 'none';
    }
  });
  // Reload
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      location.reload();
    }
  });
// ================= Get Watched Status ====================
  this.requestService.getMovies(this.watchedUrl)
  .subscribe(
    watchedMovies => {
    // Check if movie exists in watched movies
    for (let movie of watchedMovies) {
    movie.id == this.currentMovie.id ? this.watchedToggleClass = true : this.watchedToggleClass = false;
    };
    }
  )
// ================= Get Watchlist Status ==================
  this.requestService.getMovies(this.watchlistUrl)
  .subscribe(
    watchlistMovies => {
    // Check if movie exists in watchlist movies
      for (let movie of watchlistMovies) {
        movie.id == this.currentMovie.id ? this.watchlistToggleClass = true : this.watchlistToggleClass = false;
      }
    }
  )
// ================= Get Favorite Status ====================
  this.requestService.getMovies(this.favoritesUrl)
  .subscribe(
    favoriteMovies => {
    // Check if movie exists in favorite movies
      for (let movie of favoriteMovies) {
        movie.id == this.currentMovie.id ? this.favoriteToggleClass = true : this.favoriteToggleClass = false;
      }
    }
  )
}

// ================= Buttons ====================
addToWatched() {
  // add to watched database
  this.requestService.saveMovies(this.currentMovie, this.watchedUrl, this.WATCHED);
  // toggle
  const componentName = this.WATCHED;
  (this.watchedToggleClass? (this.watchedToggleClass = false, this.requestService.deleteMovie(this.currentMovie, componentName)) : this.watchedToggleClass = true);
}
addToWatchlist() {
  // add to watchlist database
  this.requestService.saveMovies(this.currentMovie, this.watchlistUrl, this.WATCHLIST);
  // toggle
  const componentName = this.WATCHLIST;
  (this.watchlistToggleClass? (this.watchlistToggleClass = false, this.requestService.deleteMovie(this.currentMovie, componentName)) : this.watchlistToggleClass = true);
}
addToFavorites() {
  // add to favorites database
  this.requestService.saveMovies(this.currentMovie, this.favoritesUrl, this.FAVORITE);
  // toggle
  const componentName = this.FAVORITE;
  (this.favoriteToggleClass? (this.favoriteToggleClass = false, this.requestService.deleteMovie(this.currentMovie, componentName)) : this.favoriteToggleClass = true);
}
// ================= Buttons ====================
reloadPage() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      location.reload();
    }
  });
}
goToPersonPage(event: any) {
  // console.log(event.target.innerText)
  for (let person of this.movieCast.slice(0, 30)) {
    if (person.name == event.target.innerText) {
      console.log("Name: " + person.name + " Id: " + person.id)
      this.router.navigate(["/people", person.name], {state: {id: person.id}});
    }
  }
}
goToDirectorPage(event: any) {
  for (let person of this.movieCrew) {
    if (person.name == event.target.innerText) {
      console.log("Name: " + person.name + " Id: " + person.id)
      this.router.navigate(["/people", person.name], {state: {id: person.id}});
    }
  }
}
showTrailer() {
  this.requestService.getMovieTrailer(this.MovieId)
  .subscribe(
    trailerResponse => {
      for(let trailer of trailerResponse.results) {
        console.log(trailer)
        if (trailer.type == "Trailer" && trailer.site == "YouTube" && trailer.name.includes("Official Trailer")) {
          this.embedLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
        } else if (trailer.type == "Trailer" && trailer.site == "YouTube") {
          this.embedLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      }
      console.log(this.embedLink)
    }
  )
}
// onCloseTrailer()
onCloseTrailer() {
  this.embedLink = null;
}
// Silder

pageNum: number = 0;
slideLeft() {
if (this.pageNum >= 1) {
  this.pageNum -= 1;
  this.getSlideValue()
  console.log(this.pageNum)
  console.log("LEFT")
}

}
slideRight() {
if (this.pageNum < 3) {
  this.pageNum += 1;
  this.getSlideValue()
  console.log(this.pageNum)
  console.log("RIGHT")
}
}
getSlideValue() {
  if (this.pageNum == 1) {
    return '-55.3rem';
  } else if (this.pageNum == 2) {

    return '-111.6rem';
  } else if (this.pageNum == 3) {

    return '-167.8rem';
  }
  return '1rem';
}

}











  // window.history.state
// to get state params


// use params in search
