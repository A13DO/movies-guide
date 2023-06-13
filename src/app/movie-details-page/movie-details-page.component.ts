import { MoviesRequestsService } from './../shared/movies-requests.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.module';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
    private requestService: MoviesRequestsService
    ) {}
movie!: Movie;
movieInfo: any = [];
movieImages: any = [];
MovieName!: string;
MovieId!: string;
link: string = "https://image.tmdb.org/t/p/w220_and_h330_face/";
backdropLink: string = "https://www.themoviedb.org/t/p/original/";
posterImage!: string;
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
      movieDetails.poster_path = this.link + movieDetails.poster_path;
      movieDetails.backdrop_path = this.backdropLink + movieDetails.backdrop_path;
      this.movieInfo = movieDetails;
      console.log(movieDetails)
    }
  )
  this.requestService.getMovieImages(this.MovieId)
  .subscribe(
    movieImages => {
      // movieImages.backdrops.file_path = this.link + movieImages.backdrops.file_path;
      this.movieImages = movieImages.backdrops;
      // for (let movieImg of movieImages.backdrops) {
      //   console.log(movieImg.file_path)
      // }
    }
  )
  // now we can use the movie name => to get the movie details and show it in the page
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
