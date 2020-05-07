import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      console.log("Нет ничего!");
    }

    this.router.navigate(["/authorization"]);
    return false;
  }
}
