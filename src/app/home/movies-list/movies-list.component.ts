import { Movie } from './../../shared/movie.module';
import { map, Subscription } from 'rxjs';
import { MoviesRequestsService } from './../../shared/movies-requests.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  constructor(private moviesRequests: MoviesRequestsService) {}
  TMDBMoives: any;
  // trendinMoives: any;
  trendingMoives: Movie[] = [];
  topRatedMoives: Movie[] = [];
  topRatedPageNum = 1;
  poster!: string;
  link: string = "https://image.tmdb.org/t/p/w220_and_h330_face/";
  bdLink: string = "https://image.tmdb.org/t/p/original/";
  backdropDiv: any ;
  movieName!: string;
  sub!: Subscription;
  scrollPosition!: number;
  // TMDB
  // Get Trending Movie WHEN LOAD
  // to-do list
  //  - we need to know the push mehod we use to add to Moive[]
  //  - choose the detalis we need to be able to add movies wit my data Movie[]
  //  -
  //  -
  @ViewChild('moviesList')
  moviesList!: ElementRef;

  fetchMovies(event: Event) {
    event.preventDefault();
    // your code to fetch movies from API and display them
    this.moviesList.nativeElement.scrollTop = this.moviesList.nativeElement.scrollHeight;
  }
  ngOnInit(): void {

    console.log(this.backdropDiv);

    // this.backdropDiv = ;
    let scrollMovie = document.getElementById("");
    this.moviesRequests.getTrendingMovies()
    .subscribe(
      data => {
        // assign Trending movies to my movies data.
        for (let movie of data.results) {
          this.trendingMoives.push({
            name: movie.title,
            id: movie.id,
            overview: movie.overview,
            year: (new Date(movie.release_date)).getFullYear().toString(),
            posterimagePath: this.link + movie.poster_path,
            backdropimagePath: this.bdLink + movie.backdrop_path,
            rating: parseFloat(movie.vote_average.toFixed(1)),
          })
        }
      }
    )
    this.getTopRatedMoviess(this.topRatedPageNum)
    this.backdropDiv = document.querySelector(".backdrop") as HTMLElement;
  }
  changeBackdrop(e: any) {
    if (e) {
      this.backdropDiv.style.backgroundImage = `url(${e})`;
    }
  }
  onMouseLeave() {
      this.backdropDiv.style.backgroundImage = `url("https://wallpapers.com/images/hd/mysterious-officer-k-blade-runner-2049-4k-ugzq0o6fnr4xsfnw.jpg")`;
  }
  getTopRatedMoviess(topRatedPageNum: number) {
      this.moviesRequests.getTopRatedMovies(topRatedPageNum) // pass page number
    .subscribe(
        data => {
          for (let movie of data.results) {
            this.topRatedMoives.push(
              {
              name: movie.title,
            id: movie.id,
            overview: movie.overview,
            year: (new Date(movie.release_date)).getFullYear().toString(),
            posterimagePath: this.link + movie.poster_path,
            rating: movie.vote_average // need edit
            }
          )
        }
        }
      )
    }
  topRatedPageOne() {
    this.topRatedPageNum = 1;
    console.log(this.topRatedPageNum)
    this.topRatedMoives = [];
    this.getTopRatedMoviess(this.topRatedPageNum)
    // window.scrollTo({
		// 	top: 619,
			// 	behavior: 'auto'
			// })
    }
    topRatedPageTwo() {
      this.topRatedPageNum = 2;
      var scrollRate = document.documentElement.scrollTop;

      console.log(this.topRatedPageNum)
      this.topRatedMoives = [];
      this.getTopRatedMoviess(this.topRatedPageNum)
    }
    topRatedPageThree() {
      this.topRatedPageNum = 3;
      console.log(this.topRatedPageNum)
      this.topRatedMoives = [];
      this.scrollPosition =  document.documentElement.scrollTop;
      console.log(this.scrollPosition)
      console.log("Before")
      // window.scrollTo(0, this.scrollPosition);
      this.getTopRatedMoviess(this.topRatedPageNum)
      }
  topRatedPageFour(event: Event) {
    event.preventDefault();
    this.topRatedPageNum = 4;
    console.log(this.topRatedPageNum)
    this.topRatedMoives = [];
    var scrollRate = document.documentElement.scrollTop;
    this.getTopRatedMoviess(this.topRatedPageNum)
    // your code to fetch movies from API and display them
    this.moviesList.nativeElement.scrollTop = this.moviesList.nativeElement.scrollHeight;
  }
  pervPage() {
    this.topRatedPageNum--;
    this.getTopRatedMoviess(this.topRatedPageNum);
  }
  nextPage() {
    this.topRatedPageNum++;
    this.getTopRatedMoviess(this.topRatedPageNum);
  }

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
  ngOnDestroy(): void {
    // this.sub.unsubscribe()
  }
}

