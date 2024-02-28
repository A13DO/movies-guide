import { MoviesRequestsService } from '../../core/services/movies-requests.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../core/interfaces/movie.module';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinksService } from '../../core/services/links.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {
  highlight: any;
  watchedIds!: number[];
  watchlistIds!: number[];
  favoriteIds!: number[];
  constructor(
    private linksService: LinksService,
    private route: ActivatedRoute,
    private router: Router,
    private requestService: MoviesRequestsService,
    private sanitizer: DomSanitizer
  ) {}
  faAdd = faPlus;
  faLove = faHeart;
  faEye = faEye;
  faStar = faStar;
movie!: Movie;
movieInfo: any;
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
watchedUrl = this.linksService.watchedUrl;
watchlistUrl = this.linksService.watchlistUrl;
favoritesUrl = this.linksService.favoritesUrl;

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
      this.currentMovie.rating = parseFloat(movieDetails.vote_average.toFixed(1));
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
          rating: parseFloat(movie.vote_average.toFixed(1))
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
  // Check if Signed in to set buttons status
  let isSignedIn = window.localStorage.getItem("isSignedIn");
  if (!isSignedIn) {
    this.watchedToggleClass = false;
    this.watchlistToggleClass = false;
    this.favoriteToggleClass = false;
  } else {
    // ================= Get Watched Status ====================
    this.requestService.getMovies(this.watchedUrl)
    .subscribe(
      watchedMovies => {
        this.watchedIds = watchedMovies.map(obj => obj.id);
        // Check if movie exists in watched movies
        this.watchedToggleClass = this.watchedIds && this.watchedIds.includes(+this.MovieId);
      }
    )
    // ================= Get Watchlist Status ==================
    this.requestService.getMovies(this.watchlistUrl)
    .subscribe(
      watchlistMovies => {
        this.watchlistIds = watchlistMovies.map(obj => obj.id);
      // Check if movie exists in watchlist movies
      this.watchlistToggleClass = this.watchlistIds && this.watchlistIds.includes(+this.MovieId);
      }
    )
    // ================= Get Favorite Status ====================
    this.requestService.getMovies(this.favoritesUrl)
    .subscribe(
      favoriteMovies => {
        this.favoriteIds = favoriteMovies.map(obj => obj.id);
        // Check if movie exists in favorite movies
        this.favoriteToggleClass = this.favoriteIds && this.favoriteIds.includes(+this.MovieId);
        console.log("NIGGA: TRUE");
      }
    )
      this.filmPoster.addEventListener('click', () => {
        this.modal.style.display = 'flex';
      });
    this.modal.addEventListener('click', (event: { target: any; }) => {
      if (event.target === this.modal || event.target === this.exitButton) {
        this.modal.style.display = 'none';
      }
    });
  }
  // Reload
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      location.reload();
    }
  });


}
// ================= Buttons ====================
addToWatched() {
  let isSignedIn = window.localStorage.getItem("isSignedIn");
  if (isSignedIn == "true") {
    const componentName = "watched";
    // toggle
    if (this.watchedToggleClass) {
      this.watchedToggleClass = false;
      this.requestService.deleteMovie(this.currentMovie, componentName);
    } else if (this.watchedToggleClass == false){
      this.watchedToggleClass = true;
      // Send Http Request
      this.requestService.saveMovies(this.currentMovie, this.watchedUrl, this.WATCHED);
    }
  } else if (!isSignedIn) {
    this.router.navigate(["/login"]);
  }

  // // add to watched database
  // this.requestService.saveMovies(this.currentMovie, this.watchedUrl, this.WATCHED);
  // // toggle
  // const componentName = this.WATCHED;
  // (this.watchedToggleClass? (this.watchedToggleClass = false, this.requestService.deleteMovie(this.currentMovie, componentName)) : this.watchedToggleClass = true);
}
addToWatchlist() {
  let isSignedIn = window.localStorage.getItem("isSignedIn");
  if (isSignedIn == "true") {
    const componentName = "watchlist";
    // toggle
    if (this.watchlistToggleClass) {
      this.watchlistToggleClass = false;
      this.requestService.deleteMovie(this.currentMovie, componentName);
    } else if (this.watchlistToggleClass == false){
      this.watchlistToggleClass = true;
      // Send Http Request
      this.requestService.saveMovies(this.currentMovie, this.watchlistUrl, this.WATCHLIST);
    }
  } else if (!isSignedIn) {
    this.router.navigate(["/login"]);
  }
}
addToFavorites() {
  let isSignedIn = window.localStorage.getItem("isSignedIn");
  if (isSignedIn == "true") {
    const componentName = "favorite";
    // toggle
    if (this.favoriteToggleClass) {
      this.favoriteToggleClass = false;
      this.requestService.deleteMovie(this.currentMovie, componentName);
    } else if (this.favoriteToggleClass == false){
      this.favoriteToggleClass = true;
      // Send Http Request
      this.requestService.saveMovies(this.currentMovie, this.favoritesUrl, this.FAVORITE);
    }
  } else if (!isSignedIn) {
    this.router.navigate(["/login"]);
  }
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
