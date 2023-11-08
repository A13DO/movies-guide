import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { WatchlistComponent } from './lists/watchlist/watchlist.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './lists/favorites/favorites.component';
import { WatchedComponent } from './lists/watched/watched.component';
import { SearchComponent } from './search/search.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { LoginComponent } from './login/login.component';
import { LoginAuthGuard } from './login/login-auth.guard';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},

  {path: 'home', component: HomeComponent},
  // {path: 'search', loadChildren: () => import('../app/search/search.module').then(s => s.SearchModule)},
  {path: 'search', component: SearchComponent},
  {path: 'search/:searchMovie/:page', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: "lists", loadChildren: () => import('../app/lists/lists.module').then(l => l.ListsModule), canActivate: [LoginAuthGuard]},
  // For Movie Details
  {path: "movie", loadChildren: () => import('../app/movie-details-page/movie-details.module').then(d => d.MovieDetailsModule)},
  {path: 'people/:person', component: PersonDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }