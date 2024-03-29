
export class Movie {
  public name: string;
  public id: number;
  public overview: string;
  public year: string;
  public posterimagePath: string;
  public backdropimagePath?: string;
  public rating: number;
  public popularity?: number;
  public directorName?: string;
  public movieStatus?: boolean;
  public isWatched?: boolean;
  public isFavorite?: boolean;
  public isWatchList?: boolean;
  constructor(
  name: string,
  id: number,
  overview: string,
  year: string,
  posterimagePath: string,
  rating: number,
  movieStatus: boolean = false,
  backdropimagePath?: string,
  directorName?: string,
  isWatched?: boolean,
  isFavorite?: boolean,
  isWatchList?: boolean
  )
  {
    this.name = name;
    this.id = id;
    this.overview = overview;
    this.year = year;
    this.posterimagePath = posterimagePath;
    this.rating = parseFloat(rating.toFixed(1));
    this.popularity = rating;
    this.backdropimagePath = backdropimagePath;
    this.directorName = directorName;
    this.movieStatus = movieStatus;
    this.isWatched = isWatched;
    this.isFavorite = isFavorite;
    this.isWatchList = isWatchList;
  }
}



