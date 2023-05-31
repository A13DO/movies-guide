


export class Movie {
  public name: string;
  public description: string;
  public year: string;
  public posterimagePath: string;
  public MovieTime: string;

  constructor(
  name: string,
  description: string,
  year: string,
  posterimagePath: string,
  MovieTime: string
  )
  {
    this.name = name;
    this.description = description;
    this.year = year;
    this.posterimagePath = posterimagePath;
    this.MovieTime = MovieTime;
  }
}
