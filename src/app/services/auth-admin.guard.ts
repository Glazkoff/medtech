import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import * as jwt_decode from "jwt-decode";
@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    let token = localStorage.getItem("token");
    if (token) {
      let userData = jwt_decode(token);
      if (userData.is_admin) {
        return true;
      } else {
        console.log("Нет ничего!");
        this.router.navigate(["/"]);
        return false;
      }
    } else {
      this.router.navigate(["/authorization"]);
      return false;
    }
  }
}
