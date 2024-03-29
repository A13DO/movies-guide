import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// core version + navigation, pagination modules:
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { Movie } from '../../../core/interfaces/movie.module';
import { MoviesRequestsService } from '../../../core/services/movies-requests.service';
import { LinksService } from '../../../core/services/links.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements OnInit {
  constructor(private moviesRequests: MoviesRequestsService, private linksService: LinksService) {}


  watchedIds!: number[];
  favoriteIds!: number[];
  watchlistIds!: number[];

  SliderMovies!: Movie[];
  @Input() movies!: Movie[];
  @Input() options: {
    slidesPerView: number;
    slidesPerGroup: number;
    width: string;
  } = {
    slidesPerView: 4,
    slidesPerGroup: 4,
    width: "660px"
  };
  @Output() backdrop: EventEmitter<any> = new EventEmitter();
  @Output() defaultBackdrop: EventEmitter<any> = new EventEmitter();
  idArray: any;
  watchlistUrl = this.linksService.watchedUrl;
  watchedUrl = this.linksService.watchlistUrl;
  favoritesUrl = this.linksService.favoritesUrl;
  // backdropDiv: any;
  ngOnInit(): void {
    this.SliderMovies = this.movies;
        // Get Watched Status
        this.moviesRequests.getMovies(this.watchedUrl)
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
        this.moviesRequests.getMovies(this.favoritesUrl)
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
        this.moviesRequests.getMovies(this.watchlistUrl)
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
  showImage(event: Event) {
    let imgDiv = ((event.target as HTMLElement).children[0].getElementsByClassName("poster")[0]) as HTMLElement;
    // assign poster
    this.SliderMovies.find( (movie) => {
      if (movie.posterimagePath == imgDiv.getAttribute("src")) {
        this.backdrop.emit(movie.backdropimagePath)
      }
    });
  }
  onMouseLeave() {
    this.defaultBackdrop.emit()
  }

    // // Configure Swiper
    // config: SwiperConfigInterface = {
    //   effect: 'coverflow',
    //   grabCursor: true,
    //   centeredSlides: true,
    //   slidesPerView: 4,
    //   slidesPerGroup: 4,
    //   speed: 1000,
    //   navigation: {
    //     nextEl: '.next-btn',
    //     prevEl: '.prev-btn',
    //   },
    // };
}
