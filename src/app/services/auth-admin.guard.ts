import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import jwt from "jwt-client";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    let token = localStorage.getItem("token");
    let userData = jwt.read(token).claim;
    if (userData) {
      return true;
    } else {
      console.log("Нет ничего!");
      this.router.navigate(["/"]);
      return false;
    }
  }
}
