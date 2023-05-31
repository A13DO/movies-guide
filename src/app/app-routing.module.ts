import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { WatchedComponent } from './watched/watched.component';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},

  {path: 'home', component: HomeComponent},
  {path: 'watched', component: WatchedComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'movie', component: MovieDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
