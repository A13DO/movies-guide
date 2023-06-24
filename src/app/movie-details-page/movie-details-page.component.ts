import { MoviesRequestsService } from './../shared/movies-requests.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.module';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

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

ngOnInit(): void {

  // this.movie = {
  // }

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
      console.log(this.fullSPosterlink)
      movieDetails.poster_path = this.posterLink + movieDetails.poster_path;
      movieDetails.backdrop_path = this.backdropLink + movieDetails.backdrop_path;
      this.movieInfo = movieDetails;
      console.log(movieDetails)
    }
  )
  // ====================== Testing ======================

  // this.requestService.getMovieTrailer(this.MovieId)
  // .subscribe(
  //   trailerResponse => {
  //     for(let trailer of trailerResponse.results) {
  //       if (trailer.type == "Trailer" && trailer.site == "YouTube" && trailer.name == "Official Trailer") {
  //         this.fullTrailerLink= this.trailerLink + trailer.key;
  //         console.log(trailer)
  //         console.log(this.fullTrailerLink)
  //       }
  //     }
  //   }
  // )
  // ====================== Testing ======================
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
          year: (new Date(movie.release_date)).getFullYear().toString(),
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
}
reloadPage() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      location.reload();
    }
  });
}
// ----------- Testing - Start -----------
goToPersonPage(event: any) {
  // console.log(event.target.innerText)
  for (let person of this.movieCast.slice(0, 30)) {
    if (person.name == event.target.innerText) {
      console.log("Name: " + person.name + " Id: " + person.id)
      this.router.navigate(["/people", person.name], {state: {id: person.id}});
    }
    // else directorName
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
// ----------- Testing - End -----------

showTrailer() {
  this.requestService.getMovieTrailer(this.MovieId)
  .subscribe(
    trailerResponse => {
      for(let trailer of trailerResponse.results) {
        console.log(trailer)
        if (trailer.type == "Trailer" && trailer.site == "YouTube") { // && trailer.name == "Official Trailer"
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

  return '-56.5rem';
} else if (this.pageNum == 2) {

  return '-113rem';
} else if (this.pageNum == 3) {

  return '-169rem';
}
return 0;
}

}
// I HAVE THE ID #DONE
// next: GEEEEETTTT MORRRRRRRRE IIINNNFFFFOOOOO
// note


// when we click on movie (Blade Runner for exmple) we get it's name and navigate to http://localhost:4200/movie/bladerunner
// and send the movie id with the name
// the id
// => to get rate, time, popularity
// => cast
// => more info...



// <a [routerLink]=['users', 10, "anna"]></a> // navigate to users/10/anna






// this.MovieName = this.route.snapshot.params['movie']; // drive
// or

// this.myRoute.params.subscribe(
//   (params: Params) => {
//     this.MovieName = params["movie"];
//    }
// ); (better)




  // window.history.state
// to get state params


// use params in search
