import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BaseApiService } from "../services/base-api.service";
import { Router } from "@angular/router";
import jwt from "jwt-client";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.css"],
})
export class AuthorizationComponent implements OnInit {
  type = "password";
  flag = true;
  myForm: FormGroup;
  user = {
    id: 1,
    name: "",
    surname: "",
    organization: "",
    role: "",
    login: "",
    password: "",
  };
  constructor(private api: BaseApiService, private router: Router) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      login: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("[a-zA-Z0-9]*"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("[a-zA-Z0-9.*!@#,]*"),
      ]),
    });
  }

  async onLogin() {
    console.log("it was a click, wow");
    let infoAboutUser;
    infoAboutUser = {
      login: this.myForm.value.login,
      password: this.myForm.value.password,
    };
    try {
      let response = await this.api.post(
        JSON.stringify(infoAboutUser),
        "/login"
      );
      console.log(await response);
      // let name = ExistOrNot[0].firstname;
      // console.log(`Name: ${name}`);

      if (response["token"]) {
        localStorage.setItem("token", response["token"]);
        let userData = jwt.read(response["token"]).claim;
        console.log(userData);
        this.flag = true;
        localStorage.setItem("userName", userData.firstname);
        localStorage.setItem("userSurname", userData.surname);
        console.log("Имечко: ", userData.firstname);
        // localStorage.setItem('log', "IN");
        this.router.navigate(["/news"]);
      } else {
        this.flag = false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  hideFlag() {
    this.flag = true;
  }
  onTogglePassword() {
    this.type = this.type == "password" ? "text" : "password";
    console.log(this.type);
  }
}
