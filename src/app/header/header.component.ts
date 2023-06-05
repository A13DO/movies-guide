import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MoviesRequestsService } from '../shared/movies-requests.service';
import { Router } from '@angular/router';
import { Movie } from '../shared/movie.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private moviesRequests: MoviesRequestsService, private router: Router) {}
  @ViewChild("searchBar") searchBar!: ElementRef<HTMLInputElement>;
  @Output('searchMoives') searchMoives = new EventEmitter<any>();

  search() {
    const searchTerm = this.searchBar.nativeElement.value;
    // Search request
    this.moviesRequests.searchForMovie(searchTerm)
    this.router.navigate(['/search'])
    // show these movies in search component
  }

}
