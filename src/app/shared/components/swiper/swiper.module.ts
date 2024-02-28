// import Swiper JS
// import Swiper styles
import { SwiperComponent } from './swiper.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardModule } from '../movie-card/movie-card.module';

@NgModule({
  declarations: [
    SwiperComponent
  ],
  imports: [
    CommonModule,
    MovieCardModule
  ],
  exports: [
    SwiperComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SwiperModule {}
