import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Swiper } from 'swiper';
// core version + navigation, pagination modules:
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { Movie } from '../shared/movie.module';
// register Swiper custom elements
register();

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements OnInit {


  SliderMovies!: Movie[];
  @Input() movies!: Movie[];
  @Output() backdrop: EventEmitter<any> = new EventEmitter();
  @Output() defaultBackdrop: EventEmitter<any> = new EventEmitter();
  // backdropDiv: any;
  ngOnInit(): void {
    this.SliderMovies = this.movies;
  }
  showImage(event: Event) {
    let imgDiv = ((event.target as HTMLElement).children[0].getElementsByClassName("poster")[0]) as HTMLElement;
    // assign poster
    this.SliderMovies.find( (movie) => {
      if (movie.posterimagePath == imgDiv.getAttribute("src")) {
        console.log(imgDiv.getAttribute("src"));
        // backgroundImage shloud be backdropDiv.url
        this.backdrop.emit(movie.backdropimagePath)
        // this.backdrop.style.backgroundImage = `url(${movie.backdropimagePath})`;
      }
    });
  }
  onMouseLeave() {
    this.defaultBackdrop.emit()
  }
}
