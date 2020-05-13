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
  inputLogin = true;
  inputPassword = true;
  fieldRequired = true;
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
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required]),
    });
  }

  async onLogin() {
    if (this.myForm.invalid) {
      if (this.myForm.value.login == "") {
          this.fieldRequired = false;
          this.inputLogin = false;
        }
      if (this.myForm.value.password == "") {
            this.fieldRequired = false;
            this.inputPassword = false;
        }
      } else {
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
          if (response["token"]) {
            localStorage.setItem("token", response["token"]);
            let userData = jwt.read(response["token"]).claim;
            console.log(userData);
            this.flag = true;
            localStorage.setItem("userName", userData.firstname);
            localStorage.setItem("userSurname", userData.surname);
           this.router.navigate(["/news"]);
          } else {
            this.flag = false;
          }
        } catch (error) {
          console.log(error);
        }
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
