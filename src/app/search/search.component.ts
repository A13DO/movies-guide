import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../shared/movie.module';
import { MoviesRequestsService } from '../shared/movies-requests.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: MoviesRequestsService
  ) {}
  watchedIds!: number[];
  favoriteIds!: number[];
  watchlistIds!: number[];
  watchedUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watched.json"
  watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/watchlist.json"
  favoritesUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/favorites.json"
  // trendinMoives: any;
  searchParam: any;
  searchMovies: Movie[] = [];
  PageNum: any;
  path: string = "https://www.themoviedb.org/t/p/original/";
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.searchParam = params;
        this.PageNum = this.searchParam['page'];
      }
      )
    console.log(this.searchParam['page'])
    this.requestsService.searchForMovie(this.searchParam['searchMovie'], this.searchParam['page']);
    this.requestsService.searchResults().subscribe(
      searchMovies => {
        this.searchMovies = []
        for (let searchMovie of searchMovies) {
          this.searchMovies.push({
            name: searchMovie.title,
            id: searchMovie.id,
            overview: searchMovie.overview,
            year: (new Date(searchMovie.release_date)).getFullYear().toString(),
            posterimagePath: this.path + searchMovie.poster_path,
            rating: parseFloat(searchMovie.vote_average.toFixed(1))
          })
        }
        console.log(searchMovies)
      }
    )
    this.requestsService.getMovies(this.watchedUrl)
    .subscribe(
      watchedMovies => {
        if (watchedMovies) {
          this.watchedIds = watchedMovies.map(obj => obj.id);
        } else{
          this.watchedIds = []
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
        } else if (!watchlistMovies){
          this.watchlistIds = [];
          console.log('The array is null or undefined.');
        };
      }
    )
  }

  PageOne() {
    this.PageNum = 1;
    this.router.navigate(["search",this.searchParam['searchMovie'], this.PageNum])
    .finally(() => {
      window.location.reload();
    });
  }
  PageTwo() {
    this.PageNum = 2;
    this.router.navigate(["search",this.searchParam['searchMovie'], this.PageNum])
      .finally(() => {
        window.location.reload();
      });
  }
  PageThree() {
    this.PageNum = 3;
    this.router.navigate(["search",this.searchParam['searchMovie'], this.PageNum])
      .finally(() => {
        window.location.reload();
      });
  }
  PageFour() {
    this.PageNum = 4;
    this.router.navigate(["search",this.searchParam['searchMovie'], this.PageNum])
      .finally(() => {
        window.location.reload();
      });
  }
  pervPage() {
    this.PageNum--;
    this.router.navigate(["search",this.searchParam['searchMovie'], this.PageNum])
      .finally(() => {
        window.location.reload();
      });
  }
  nextPage() {
    this.PageNum++;
    this.router.navigate(["search",this.searchParam['searchMovie'], this.PageNum])
      .finally(() => {
        window.location.reload();
      });
  }
}
