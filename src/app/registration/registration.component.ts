import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BaseApiService } from "../services/base-api.service";
import { Router } from "@angular/router";
import jwt from "jwt-client";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  type = "password";
  myForm: FormGroup;
  values = "";
  flag = true;
  constructor(private api: BaseApiService, private router: Router) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-ZА-Яа-яёЁ]*"),
      ]),
      surname: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-ZА-Яа-яёЁ]*"),
      ]),
      organization: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
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

  async onRegistr() {
    console.log("it was a click, wow");
    let infoAboutNewUser;
    infoAboutNewUser = {
      name: this.myForm.value.name,
      surname: this.myForm.value.surname,
      login: this.myForm.value.login,
      password: this.myForm.value.password,
      organization: this.myForm.value.organization,
      role: this.myForm.value.role,
    };
    console.log(infoAboutNewUser);
    try {
      let registartionRes = await this.api.post(
        JSON.stringify(infoAboutNewUser),
        "/users"
      );
      console.log(registartionRes);
      if (registartionRes["token"]) {
        this.flag = false;
        try {
          let userData = jwt.read(registartionRes["token"]).claim;
          console.log(userData);
          localStorage.setItem("token", registartionRes["token"]);
          localStorage.setItem("userName", userData.firstname);
          localStorage.setItem("userSurname", userData.surname);
        } catch (error) {
          console.log(error);
        }
        this.router.navigate(["/news"]);
      } else {
        this.flag = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  onTogglePassword() {
    this.type = this.type == "password" ? "text" : "password";
    console.log(this.type);
  }
}
