


export class Movie {
  public name: string;
  public id: number;
  public overview: string;
  public year: string;
  public posterimagePath: string;
  public MovieTime: string;

  constructor(
  name: string,
  id: number,
  overview: string,
  year: string,
  posterimagePath: string,
  MovieTime: string
  )
  {
    this.name = name;
    this.id = id;
    this.overview = overview;
    this.year = year;
    this.posterimagePath = posterimagePath;
    this.MovieTime = MovieTime;
  }
}
