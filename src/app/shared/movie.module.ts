


export class Movie {
  public name: string;
  public id: number;
  public overview: string;
  public year: string;
  public posterimagePath: string;
  public rating: number;
  public popularity?: number;

  constructor(
  name: string,
  id: number,
  overview: string,
  year: string,
  posterimagePath: string,
  rating: number,
  popularity?: number,
  )
  {
    this.name = name;
    this.id = id;
    this.overview = overview;
    this.year = year;
    this.posterimagePath = posterimagePath;
    this.rating = rating;
    this.popularity = rating;
  }
}
