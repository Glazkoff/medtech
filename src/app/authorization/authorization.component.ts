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
  loginNotRight = true;
  type = "password";
  myForm: FormGroup;
  placeholderLogin = "Введите логин";
  placeholderPassword = "Введите пароль";
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
        this.placeholderLogin="";
      }
      if (this.myForm.value.password == "") {
        this.fieldRequired = false;
        this.placeholderPassword="";
      }
      } else {
        this.fieldRequired = true;
        // console.log("it was a click, wow");
        let infoAboutUser;
        infoAboutUser = {
          login: this.myForm.value.login,
          password: this.myForm.value.password,
        };
        this.type = "password";
        try {
          let response = await this.api.post(
            JSON.stringify(infoAboutUser),
            "/login"
          );
          if (response["token"]) {
            localStorage.setItem("token", response["token"]);
            
            let userData = await jwt.read(response["token"]);
            userData = userData.claim;
            console.log("UserData ",userData);
            localStorage.setItem("userName", userData.firstname);
            localStorage.setItem("userSurname", userData.surname);
           this.router.navigate(["/news"]);
          } else {
            
          }
        } catch (error) {
          console.log(error);
          this.myForm.patchValue({login: '', password: ''});
            this.placeholderLogin="";
            this.placeholderPassword="";
            this.loginNotRight = false;
        }
        
        this.loginNotRight = true;
        this.type = "password";
        this.placeholderLogin = "Введите логин";
        this.placeholderPassword = "Введите пароль";
        this.fieldRequired = true;
      }

  }
 
  onTogglePassword() {
    this.type = this.type == "password" ? "text" : "password";
  }
}
