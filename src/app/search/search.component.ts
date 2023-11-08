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
            rating: searchMovie.vote_average
          })
        }
        console.log(searchMovies)
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
