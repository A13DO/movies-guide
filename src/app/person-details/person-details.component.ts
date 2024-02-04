import { MoviesRequestsService } from './../shared/movies-requests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../shared/movie.module';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService : MoviesRequestsService
  ) {}
  urlParams: any;
  id: any;
  personDetails: any;
  personMovies: Movie[] = [];
  watchedIds!: number[];
  favoriteIds!: number[];
  watchlistIds!: number[];
  watchedUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watched.json"
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watchlist.json"
  favoritesUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/favorites.json"
  // backdropDiv: any;
  path: string = "https://www.themoviedb.org/t/p/original/";
  profilePic!: string;
  ngOnInit(): void {
    this.getPersonDetails()
  }



  getPersonDetails() {
    this.route.params.subscribe(
      params => {
        this.urlParams = params;
        console.log(this.urlParams)
        console.log(this.id)
      }
      )
      // get person Id
      const state = window.history.state;
      this.id = state ? state.id : null;
      console.log(this.id);
      this.requestsService.getPersonCredits(this.id).subscribe(
        credits => {
          console.log(credits)
          // Cast Movies For actors
          for (let castMovie of credits.cast) {
            this.personMovies.push({
              name: castMovie.title,
              id: castMovie.id,
              overview: castMovie.overview,
              year: (new Date(castMovie.release_date)).getFullYear().toString(),
              posterimagePath: this.path + castMovie.poster_path,
              rating: parseFloat(castMovie.vote_average.toFixed(1))
            })
          }
          this.personMovies.sort((a, b) => b.rating - a.rating);
        }
      )
      this.requestsService.getPersonDetails(this.id).subscribe(
        details => {
          this.personDetails = details;
          this.profilePic = this.path + details.profile_path;
          console.log(details)
        }
      )
      this.requestsService.getMovies(this.watchedUrl)
      .subscribe(
        watchedMovies => {
          if (watchedMovies) {
            this.watchedIds = watchedMovies.map(obj => obj.id);
            console.log('watchedIds initialized:', this.watchedIds);
          } else{
            // this.watchedIds = []
            console.log('The array is null or undefined.');
        }
        }
      )
      // Get Favorite Status
      this.requestsService.getMovies(this.favoritesUrl)
      .subscribe(
        favoriteMovies => {
          if (favoriteMovies) {
            this.favoriteIds = favoriteMovies.map(obj => obj.id);
            // console.log(this.favoriteIds);
          } else if (!favoriteMovies){
            this.favoriteIds = [];
            console.log('The array is null or undefined.');
          }
        }
      )
      // Get Watchlist Status
      this.requestsService.getMovies(this.watchlistUrl)
      .subscribe(
        watchlistMovies => {
          if (watchlistMovies) {
            this.watchlistIds = watchlistMovies.map(obj => obj.id);
            // console.log(this.watchlistIds);
          } else if (!watchlistMovies){
            this.watchlistIds = [];
            console.log('The array is null or undefined.');
          };
        }
      )
  }
}
