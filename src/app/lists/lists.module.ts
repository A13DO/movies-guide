import { NgModule } from "@angular/core";
import { WatchedComponent } from "./watched/watched.component";
import { WatchlistComponent } from "./watchlist/watchlist.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ListsComponent } from "./lists.component";
import { CommonModule } from "@angular/common";
import { MovieCardModule } from "../home/movies-list/movie-card/movie-card.module";
import { LoadingModule } from "../loading/loading.module";

const routes: Routes = [
  // /Lists
  {path: '',
  component: ListsComponent,
  children: [
    {path: '', redirectTo: "watched", pathMatch: "full"},
    {path: 'watched', component: WatchedComponent},
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'favorites', component: FavoritesComponent}
  ]}
]

@NgModule({
  declarations: [
    WatchedComponent,
    WatchlistComponent,
    FavoritesComponent,
    ListsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    MovieCardModule,
    LoadingModule
  ],
})

export class ListsModule {}
