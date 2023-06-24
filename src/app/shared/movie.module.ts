


export class Movie {
  public name: string;
  public id: number;
  public overview: string;
  public year: string;
  public posterimagePath: string;
  public rating: number;
  public popularity?: number;
  public directorName?: string;

  constructor(
  name: string,
  id: number,
  overview: string,
  year: string,
  posterimagePath: string,
  rating: number,
  popularity?: number,
  directorName?: string
  )
  {
    this.name = name;
    this.id = id;
    this.overview = overview;
    this.year = year;
    this.posterimagePath = posterimagePath;
    this.rating = rating;
    this.popularity = rating;
    this.directorName = directorName;
  }
}
