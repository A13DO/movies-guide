


export class Movie {
  public name: string;
  public overview: string;
  public year: string;
  public posterimagePath: string;
  public MovieTime: string;

  constructor(
  name: string,
  overview: string,
  year: string,
  posterimagePath: string,
  MovieTime: string
  )
  {
    this.name = name;
    this.overview = overview;
    this.year = year;
    this.posterimagePath = posterimagePath;
    this.MovieTime = MovieTime;
  }
}
