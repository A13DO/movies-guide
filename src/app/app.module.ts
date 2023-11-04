import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MoviesListComponent } from './home/movies-list/movies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MovieTrailerComponent } from './movie-details-page/movie-trailer/movie-trailer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HttpInterceptproviders } from './http-interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MovieCardModule } from './home/movies-list/movie-card/movie-card.module';
import { LoadingModule } from './loading/loading.module';
import { SwiperComponent } from './swiper/swiper.component';
import { SwiperModule } from './swiper/swiper.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // WatchlistComponent,
    HeaderComponent,
    MoviesListComponent,
    // MovieCardComponent,
    // FavoritesComponent,
    // WatchedComponent,
    // MovieDetailsPageComponent,
    // MovieTrailerComponent,
    SearchComponent,
    PersonDetailsComponent,
    NavMenuComponent,
    // LoadingComponent,
    LoginComponent,
    // SwiperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    LoadingModule,
    MovieCardModule,
    SwiperModule
  ],
  providers: [SearchComponent, HttpInterceptproviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
