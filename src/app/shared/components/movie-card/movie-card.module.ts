import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MovieCardComponent
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class MovieCardModule { }
