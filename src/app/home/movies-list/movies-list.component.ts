import { map, Subscription } from 'rxjs';
import { MoviesRequestsService } from './../../shared/movies-requests.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/shared/movie.module';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [
    {
      name: 'Blade Runner 2046',
      id: 1,
      overview: '',
      year: '2017',
      posterimagePath: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      MovieTime: '2h'
    },
    {
      name: 'Taxi Driver',
      id: 2,
      overview: '',
      year: '1976',
      posterimagePath: 'https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      MovieTime: '1h 54m'
    },
    {
      name: 'Whiplash',
      id: 3,
      overview: '',
      year: '2017',
      posterimagePath: 'https://i.etsystatic.com/36067604/r/il/4355d2/4230665308/il_fullxfull.4230665308_r13v.jpg',
      MovieTime: '2h'
    }
    ,
    {
      name: 'Her',
      id: 4,
      overview: '',
      year: '2013',
      posterimagePath: 'https://alternativemovieposters.com/wp-content/uploads/2015/08/her.jpg',
      MovieTime: '2h'
    }
  ]
  constructor(private moviesRequests: MoviesRequestsService) {}
  TMDBMoives: any;
  // trendinMoives: any;
  trendingMoives: Movie[] = [];
  topRatedMoives: Movie[] = [];
  topRatedPageNum = 1;
  poster!: string;
  link: string = "https://image.tmdb.org/t/p/w220_and_h330_face/";

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
    console.log(this.moviesList)
    window.addEventListener('scroll', function() {
      // Get the current scroll position
      var scrollRate = document.documentElement.scrollTop;

      // Log the scroll position in the developer console
      console.log('Scroll position:', scrollRate);
    });
    // this.movies.push()
    // =============== Trending Movies =================
    this.moviesRequests.getTrendingMovies()
    .subscribe(
      data => {
        // assign Trending movies to my movies data.
        for (let movie of data.results) {
          console.log(movie);
          this.trendingMoives.push({
            name: movie.title,
            id: movie.id,
            overview: movie.overview,
            year: (new Date(movie.release_date)).getFullYear().toString(),
            posterimagePath: this.link + movie.poster_path,
            MovieTime: '2h' // need edit
          })
        }
      }
      )
    // =============== Top Rated Movies =================
    //
      // this.moviesRequests.getTopRatedMovies(this.topRatedPageNum) // pass page number
      // .subscribe(
      //   data => {
      //     for (let movie of data.results) {
      //       this.topRatedMoives.push(
      //         {
      //         name: movie.title,
      //         overview: movie.overview,
      //         year: (new Date(movie.release_date)).getFullYear().toString(),
      //         posterimagePath: this.link + movie.poster_path,
      //         MovieTime: '2h' // need edit
      //         }
      //       )
      //     }
      //     console.log("--------------------------------- From Top Rated Start---------------------------------")
      //     console.log(this.topRatedMoives)
      //     console.log("--------------------------------- From Top Rated End---------------------------------")
      //   }
      // )
      this.getTopRatedMoviess(this.topRatedPageNum)
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
              MovieTime: '2h' // need edit
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

      return '-56.5rem';
    } else if (this.pageNum == 2) {

      return '-113rem';
    } else if (this.pageNum == 3) {

      return '-169rem';
    }
    return 0;
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe()
  }
}


