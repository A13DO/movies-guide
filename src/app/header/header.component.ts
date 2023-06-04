import { Component, ElementRef, ViewChild } from '@angular/core';
import { MoviesRequestsService } from '../shared/movies-requests.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private moviesRequests: MoviesRequestsService) {}
  @ViewChild("searchBar") searchBar!: ElementRef<HTMLInputElement>;
  search() {
    const searchTerm = this.searchBar.nativeElement.value;
    this.moviesRequests.searchForMovie(searchTerm)
    // show these movies in search component
  }
}
