import { Component, Input, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.SliderMovies = this.movies;
  }
}
