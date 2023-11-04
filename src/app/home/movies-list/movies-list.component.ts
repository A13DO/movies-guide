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
    let scrollMovie = document.getElementById("");
    // window.addEventListener('scroll', function() {
    //   // Get the current scroll position
    //   var scrollRate = document.documentElement.scrollTop;

    //   // Log the scroll position in the developer console
    //   console.log('Scroll position:', scrollRate);
    // });
    // this.movies.push()
    // =============== Trending Movies =================
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
            rating: movie.vote_average,
          })
        }
      }
    )
    this.getTopRatedMoviess(this.topRatedPageNum)
    this.backdropDiv = document.querySelector(".backdrop") as HTMLElement;

    }
    showImage(event: Event) {
      let imgDiv = ((event.target as HTMLElement).children[0].getElementsByClassName("poster")[0]) as HTMLElement;
      // assign poster
      this.trendingMoives.find( (movie) => {
        if (movie.posterimagePath == imgDiv.getAttribute("src")) {
          // backgroundImage shloud be backdropDiv.url

          this.backdropDiv.style.backgroundImage = `url(${movie.backdropimagePath})`;
        }
      });
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
      // console.log("After")
      // var scrollRate = document.documentElement.scrollTop;
      // Get the current position of the scroll bar

      // Refresh the page

      // Set the scroll position back to where it was before refreshing
      }
    topRatedPageFour(event: Event) {
      event.preventDefault();
      this.topRatedPageNum = 4;
      console.log(this.topRatedPageNum)
      this.topRatedMoives = [];
      var scrollRate = document.documentElement.scrollTop;
      this.getTopRatedMoviess(this.topRatedPageNum)
      // if (scrollRate == 619 || scrollRate !== 619) {
      //   window.scrollTo({
      //     top: 619,
      //     behavior: 'auto'
      //   })
      // }
      // your code to fetch movies from API and display them
      this.moviesList.nativeElement.scrollTop = this.moviesList.nativeElement.scrollHeight;

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


