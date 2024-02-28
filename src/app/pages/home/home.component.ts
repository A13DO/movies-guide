import { Component, OnInit } from '@angular/core';
import { Movie } from '../../core/interfaces/movie.module';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private authService: AuthService) {}
  watchlistMovies: Movie[] = [];
  expireTime: any;
  ngOnInit() {
    this.expireTime = window.localStorage.getItem("expiresIn")
    this.authService.setLogoutTimer(+this.expireTime)
  }
  }
