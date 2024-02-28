import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieDetailsPageComponent } from "./movie-details-page.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LoadingModule } from "../../shared/components/loading/loading.module";
import { MovieTrailerComponent } from "./movie-trailer/movie-trailer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MovieCardModule } from "../../shared/components/movie-card/movie-card.module";
import { SwiperModule } from "../../shared/components/swiper/swiper.module";


const routes: Routes = [
  {
    path: "",
    component: MovieDetailsPageComponent,
    children: [
      {path: ":movie", component: MovieDetailsPageComponent},
    ]
  }
]


@NgModule({
  declarations: [
    MovieDetailsPageComponent,
    MovieTrailerComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    LoadingModule,
    MovieCardModule,
    SwiperModule,
  ]
})

export class MovieDetailsModule {}
