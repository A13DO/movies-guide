import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../shared/movie.module';
import { MoviesRequestsService } from '../shared/movies-requests.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private requestsService: MoviesRequestsService
  ) {}
  searchParam: any;
  searchMovies: Movie[] = [];
  path: string = "https://www.themoviedb.org/t/p/original/";
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.searchParam = params;
        console.log(this.searchParam['searchMovie'])
      }
    )
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

}
