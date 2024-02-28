import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  constructor(
    private route: ActivatedRoute
  ) {}
  toggleBtn: any;
    menu: any;
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        // console.log(params)
      }
    )
    this.toggleBtn = document.getElementById("gnavi")  as HTMLInputElement;
    this.menu = document.querySelector(".nav-menu") as HTMLInputElement;
    let navMenuStatus = window.localStorage.getItem("nav-menu-status");
    // console.log(this.menu)
    // console.log(navMenuStatus)

    if (navMenuStatus == "true") {
      this.toggleBtn?.classList.add("nav-open");
      this.menu.style.left = "0"
      this.menuStatus.emit("true")
    } else if (navMenuStatus == "false") {
      this.toggleBtn?.classList.remove("nav-open")
      this.menu.style.left = "-230px"
      this.menuStatus.emit("false")
    }
  }
  @Output() menuStatus: EventEmitter<any> = new EventEmitter();
  toggleNavBtn() {
    if (!this.toggleBtn?.classList.contains("nav-open")) {
      window.localStorage.setItem("nav-menu-status", "true")
      this.toggleBtn?.classList.add("nav-open");
      this.menu.style.left = "0"
      this.menuStatus.emit("true")
    } else if (this.toggleBtn?.classList.contains("nav-open")) {
      this.menu.style.left = "-230px"
      this.menuStatus.emit("false")
      this.toggleBtn?.classList.remove("nav-open")
      window.localStorage.setItem("nav-menu-status", "false")
    }
  }
}
