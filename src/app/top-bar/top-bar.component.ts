import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  flag = true;
  logOut = true;
  name = "Арина";
  surname = "Оськина";
  isSetName = false;
  constructor(private router: Router) {}

  ngOnInit() {
    let name = localStorage.getItem("userName");
    let surname = localStorage.getItem("userSurname");
    if (name !== undefined && surname !== undefined) {
      this.isSetName = true;
      this.name = name;
      this.surname = surname;
    }
  }

  ngDoCheck() {
    if (localStorage.getItem("userName") !== null) {
      this.name = localStorage.getItem("userName");
      console.log("Имя: ", this.name);
    }
    if (localStorage.getItem("userSurname") !== null) {
      this.surname = localStorage.getItem("userSurname");
      console.log("Фамилия: ", this.surname);
    }
    if (localStorage.getItem("token") !== null) {
      this.logOut = true;
      // localStorage.removeItem("log");
    } else {
      this.logOut = false;
    }
  }

  openDropdownMenu() {
    this.flag = !this.flag;
  }
  onLogOut() {
    this.logOut = !this.logOut;
    localStorage.clear();
    this.flag = !this.flag;
    this.router.navigate(["/news"]);
  }
}
