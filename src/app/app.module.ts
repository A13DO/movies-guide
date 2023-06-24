import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { HeaderComponent } from './header/header.component';
import { MoviesListComponent } from './home/movies-list/movies-list.component';
import { MovieCardComponent } from './home/movies-list/movie-card/movie-card.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchedComponent } from './watched/watched.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MovieTrailerComponent } from './movie-details-page/movie-trailer/movie-trailer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WatchlistComponent,
    HeaderComponent,
    MoviesListComponent,
    MovieCardComponent,
    FavoritesComponent,
    WatchedComponent,
    MovieDetailsPageComponent,
    SearchComponent,
    PersonDetailsComponent,
    MovieTrailerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
