import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';
import { MoviesListComponent } from './pages/home/movies-list/movies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './pages/search/search.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { MovieTrailerComponent } from './pages/movie-details-page/movie-trailer/movie-trailer.component';
import { HttpInterceptproviders } from './core/interceptors';
import { LoginComponent } from './core/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { MovieCardModule } from './shared/components/movie-card/movie-card.module';
import { LoadingModule } from './shared/components/loading/loading.module';
import { SwiperModule } from './shared/components/swiper/swiper.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MoviesListComponent,
    SearchComponent,
    PersonDetailsComponent,
    NavMenuComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    LoadingModule,
    MovieCardModule,
    BrowserAnimationsModule,
    // MatFormFieldModule,
    SwiperModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-left'
    }),
  ],
  providers: [SearchComponent, HttpInterceptproviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
