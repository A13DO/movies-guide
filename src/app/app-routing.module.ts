
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './pages/search/search.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { LoginComponent } from './core/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignedInGuard } from './core/guards/signedin.guard';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},

  {path: 'home', component: HomeComponent},
  // {path: 'search', loadChildren: () => import('../app/search/search.module').then(s => s.SearchModule)},
  {path: 'search', component: SearchComponent},
  {path: 'search/:searchMovie/:page', component: SearchComponent},
  {path: 'login', component: LoginComponent, canActivate: [SignedInGuard]},
  {path: "lists", loadChildren: () => import('../app/pages/lists/lists.module').then(l => l.ListsModule), canActivate: [AuthGuard]},
  // For Movie Details
  {path: "movie", loadChildren: () => import('../app/pages/movie-details-page/movie-details.module').then(d => d.MovieDetailsModule)},
  {path: 'people/:person', component: PersonDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
