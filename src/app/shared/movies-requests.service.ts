import { Injectable, OnInit } from '@angular/core';
import { Movie } from './movie.module';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesRequestsService {
  constructor(private http: HttpClient) {
    const watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json";
    const favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json";
    const watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json";



    // --------------- Watched --------------------
    this.getMovies(watchedUrl).subscribe(
      movies => {
        console.log("watched works!")
        if (movies === null) {
          movies = []
        }
      return this.watchedMovies = movies;
      })
    // --------------- Watchlist --------------------
    this.getMovies(watchlistUrl).subscribe(
      movies => {
        console.log("watchlist works!")
        if (movies === null) {
          movies = []
        }
      return this.watchlistMovies = movies;
      })
    // --------------- Favorites --------------------
    this.getMovies(favoritesUrl).subscribe(
      movies => {
        console.log("favorites works!")
        if (movies === null) {
          movies = []
        }
      return this.favoriteMovies = movies;
    })
  }
  // subject to stream searched movies data
  private searchResponse: Subject<any> = new Subject();
  // subject to get search pages numbers subject
  public pageNumberSub: Subject<number> = new Subject<number>();

  // we should have all movies here to see if the new movie already exits

  watchedMovies: Movie[] = [];
  watchlistMovies: Movie[] = [];
  favoriteMovies: Movie[] = [];

  savedMovies: Movie[] = [];
  url!: string;
  // we need fetched movies ###########
  saveMovies(newMovie: Movie, url: string, store: string) {
    // -----------------------------------
    // check where we store the data
    const WATCHLIST = "watchlist"
    const FAVORITE = "favorite"
    const WATCHED = "watched"
    if (store === WATCHED) {
      this.savedMovies = this.watchedMovies
    } else if (store === WATCHLIST) {
      this.savedMovies = this.watchlistMovies
    } else if (store === FAVORITE) {
      this.savedMovies = this.favoriteMovies
    }

    // -----------------------------------
    // check if the new movie already exits
    const movieExists = this.savedMovies.some(movie => movie.name === newMovie.name);
    console.log(movieExists)
    if (!movieExists) {
      console.log("Added")
      // send data to dataBase
      // REQUEST
      this.savedMovies.push(newMovie)
      console.log("###########")
      console.log(this.savedMovies)
      console.log("###########")
      // SEND MOVIES
      this.http.put<Movie[]>(url, this.savedMovies).subscribe()
    } else {
      console.log("Movie already added")
    }
  }

  // pipe to control key in response Data
  getMovies(url: string) {
    return this.http.get<Movie[]>(url)
  }

  deleteMovie(movie: Movie, componentName: string) {

    // know which component we work with and get it's movie
    this.identfiyWhichComponent(componentName)
    // delete the movie
    this.savedMovies = this.savedMovies.filter((moviee) =>
      moviee.name !== movie.name
      )
    console.log(this.savedMovies)
    this.http.put(this.url, this.savedMovies).subscribe()
  }




  identfiyWhichComponent(componentName: string) {
    const WATCHED = "watched"
    const WATCHLIST = "watchlist"
    const FAVORITE = "favorite"
    const watchedUrl = "https://watched-movies-36f2a-default-rtdb.firebaseio.com/watched.json";
    const watchlistUrl = "https://movies-guide-eb5a7-default-rtdb.firebaseio.com/movies.json";
    const favoritesUrl = "https://favorite-movies-f80e3-default-rtdb.firebaseio.com/favorites.json";
    if (componentName === WATCHED) {
      this.savedMovies = this.watchedMovies;
      this.url = watchedUrl;
    } else if (componentName === WATCHLIST) {
      this.savedMovies = this.watchlistMovies
      this.url = watchlistUrl;
    } else if (componentName === FAVORITE) {
      this.savedMovies = this.favoriteMovies
      this.url = favoritesUrl;
    }
  }

  moviesResults!: Movie[];

  // ---------- Search ---------------
  searchForMovie(searchTerm: string, pageNumber: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGE3YjJiN2Q4Y2U3MTE2ZjQxYWMyNjA4ZTUyZDY2NiIsInN1YiI6IjY0NjM1MmI4OGM0NGI5NzgwOGZmYjRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mevgoOXkY-qBd8n97AqhpZ94OEIRprqRE4hBxN2TejI'
      }
    };
    const query = encodeURIComponent(searchTerm);
    // Page Number
    // this.pageNumberSub.subscribe(
    //   pageNumber => {
    //     pageNum = pageNumber;
    //     console.log(pageNum)
    //   }
    // )
    // return
    this.http.get<any>(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageNumber}`, options)
    .subscribe(
      responseMovies => {
        this.searchResponse.next(responseMovies.results)
      }
    )
  }
  // fetch but page=2
  // solve
  // (searchTerm, page=1)default ()
  searchResults() {
    return this.searchResponse;
  }

  getMoviesToCheck(url: string, store: Movie[]) {
    this.getMovies(url).subscribe(
      movies => {
        console.log("favorites works")
        if (movies === null) {
          movies = []
        }
      return store = movies;
    }
    )
  }

// ------------ Get Trending Movies -------------
getTrendingMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGE3YjJiN2Q4Y2U3MTE2ZjQxYWMyNjA4ZTUyZDY2NiIsInN1YiI6IjY0NjM1MmI4OGM0NGI5NzgwOGZmYjRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mevgoOXkY-qBd8n97AqhpZ94OEIRprqRE4hBxN2TejI'
      }
    };
  return this.http.get<any>('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
  }
  // ------------ Get Top Rated Movies -------------
  getTopRatedMovies(topRatedPageNum: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGE3YjJiN2Q4Y2U3MTE2ZjQxYWMyNjA4ZTUyZDY2NiIsInN1YiI6IjY0NjM1MmI4OGM0NGI5NzgwOGZmYjRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mevgoOXkY-qBd8n97AqhpZ94OEIRprqRE4hBxN2TejI'
      }
    };

    return this.http.get<any>(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${topRatedPageNum}`, options)
  }
}
