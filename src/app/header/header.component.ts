import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MoviesRequestsService } from '../shared/movies-requests.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Movie } from '../shared/movie.module';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(
    private moviesRequests: MoviesRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    private SearchComponent: SearchComponent,
    ) {}
  @ViewChild("searchBar") searchBar!: ElementRef<HTMLInputElement>;
  @Output('searchMoives') searchMoives = new EventEmitter<any>();
  currentRoute: any;
  ifMovieRoute!: boolean;
  currenturl!: string;
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      // const regex = /(\/\w+)\/(\w+)(\/?)/;
      const regex = /(\/\w+)(\/([\w%:]+)?(?:\/(\w+))?)?$/;
      this.currenturl = event.url;
      console.log(this.currenturl)
      const matches = this.currenturl.match(regex);
      console.log(matches)
      this.currentRoute = matches?.[1];
      console.log(this.currentRoute)
      this.ifMovieRoute = this.currentRoute == "/movie"
      }
  })
  }
  // const str = '/movie/Drive';
  // const matches = str.match(regex);

  // if (matches) {
  //   const word = matches[1];
  //   console.log(word); // Output: "Drive"
  // }



  // search click event
  search() {
    // search value
    const searchTerm = this.searchBar.nativeElement.value;
    let pageNum = 1;
    // edit
    this.SearchComponent.pageNumberSub.subscribe(
        pageNumber => {
          pageNum = pageNumber;
          console.log(pageNum)
        }
      )
    // Search request                              //edit
    this.moviesRequests.searchForMovie(searchTerm, pageNum) // pageNumber

    this.router.navigate(['/search', searchTerm, pageNum])
    // show these movies in search component
  }

}

// get movie URL query and page #Done
// when change page use them as params values for the new request #Done


// able to search from URL params
// { path: 'search/:query', component: SearchResultsComponent }
// component: public query: string;
// HTML: <div [(ngModel)]="query" ></div>
