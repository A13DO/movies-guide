import { Auth } from '@firebase/auth';
import { AuthService } from '../../auth/services/auth.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MoviesRequestsService } from '../../services/movies-requests.service';
import { NavigationEnd, Router } from '@angular/router';
import { SearchComponent } from '../../../pages/search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
showSearch() {
  this.searchBar.nativeElement.style.display = 'block';;
}
  constructor(
    private moviesRequests: MoviesRequestsService,
    private router: Router,
    private authService: AuthService,
    private SearchComponent: SearchComponent,
    ) {}
  @ViewChild("searchBar") searchBar!: ElementRef<HTMLInputElement>;
  @Output('searchMoives') searchMoives = new EventEmitter<any>();
  currentRoute: any;
  ifMovieRoute!: boolean;
  currenturl!: string;
  isSignedIn!: boolean;
  ngOnInit(): void {
    this.authService.isSignedIn.subscribe(
      (status) => {
        this.isSignedIn = status;
        console.log("Status Now: ", status)
      })
    let localStatus = window.localStorage.getItem("isSignedIn");
    if ( localStatus == "true") {
      this.isSignedIn = true;
    } else if (!localStatus) {
      this.isSignedIn = false;
    }
    console.log(this.isSignedIn);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      // const regex = /(\/\w+)\/(\w+)(\/?)/;
      // const regex = /(\/\w+)(\/([\w%:]+)?(?:\/(\w+))?)?$/;
      const regex = /^(\/movie)\/.+$/;
      this.currenturl = event.url;
      console.log(this.currenturl)
      const matches = this.currenturl.match(regex);
      this.currentRoute = matches?.[1];
      // console.log(this.currentRoute)
      this.ifMovieRoute = this.currentRoute == "/movie"
      }
  })

  }
  // Sign Out
  onSignOut() {
    this.authService.signOut();
  }

  // search click event
  search() {
    // search value
    const searchTerm = this.searchBar.nativeElement.value;
    let pageNum = 1;
    // Search request                              //edit
    this.moviesRequests.searchForMovie(searchTerm, pageNum) // pageNumber

    this.router.navigate(['/search', searchTerm, pageNum])
    // show these movies in search component
  }
}
