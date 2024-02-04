import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.module';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private loginService: LoginService) {}
  watchlistMovies: Movie[] = [];
  expireTime: any;
  ngOnInit() {
    this.expireTime = window.localStorage.getItem("expiresIn")
    this.loginService.setLogoutTimer(+this.expireTime)
  }
  }
