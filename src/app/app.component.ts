import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movies-guide';
  holder : any;
  menuStatus :any;
  ngOnInit(): void {
    this.holder = document.querySelector(".page-holder") as HTMLInputElement;
    this.holder.style.left = "0"
  }
  getMenuStatus(status: any) {
    this.menuStatus = status;
  //   if (this.menuStatus == "true") {
  //   this.holder.style.left = "0"

  //   } else if (this.menuStatus == "false") {
  //     this.holder.style.left = "-230px"

  //   }
  }
}
