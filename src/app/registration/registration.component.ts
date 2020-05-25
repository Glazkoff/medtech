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
  fieldRequired = true;
  loginExist = true;
  inputName = true;
  inputSurname = true;
  inputOrganization = true;
  inputRole = true;
  inputLogin = true;
  inputPassword = true;

  placeholderName = "Введите имя";
  placeholderSurname = "Введите фамилию";
  placeholderOrganization = "Введите организацию";
  placeholderRole = "Введите роль";
  placeholderLogin = "Введите логин";
  placeholderPassword = "Введите пароль";
  constructor(private api: BaseApiService, private router: Router) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl("", [
        Validators.required
      ]),
      surname: new FormControl("", [
        Validators.required
      ]),
      organization: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      login: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required,
      ]),
    });
  }

  async onRegistr() {
    if (this.myForm.invalid) {
      if (this.myForm.value.name == "") {
          this.fieldRequired = false;
          this.inputName = false;
          this.placeholderName="";
        }
      if (this.myForm.value.surname == "") {
            this.fieldRequired = false;
            this.inputSurname = false;
            this.placeholderSurname="";
        } 
      if (this.myForm.value.organization == "") {
            this.fieldRequired = false;
            this.inputOrganization= false;
            this.placeholderOrganization="";
        }
      if (this.myForm.value.role == "") {
          this.fieldRequired = false;
          this.inputRole = false;
          this.placeholderRole="";
        }
      if (this.myForm.value.login == "") {
          this.fieldRequired = false;
          this.inputLogin = false;
          this.placeholderLogin="";
        }
      if (this.myForm.value.password == "") {
          this.fieldRequired = false;
          this.inputPassword = false;
          this.placeholderPassword="";
        }
    } else {
      this.fieldRequired = true;
      this.loginExist = true;
      this.inputName = true;
      this.inputSurname = true;
      this.inputOrganization = true;
      this.inputRole = true;
      this.inputLogin = true;
      this.inputPassword = true;
    
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
      this.type = "password";
      console.log(infoAboutNewUser);
      try {
        let registartionRes = await this.api.post(
        JSON.stringify(infoAboutNewUser), "/users");
        console.log(registartionRes);
        if (registartionRes["token"]) {
          try {
            let userData = jwt.read(registartionRes["token"]).claim;
            console.log(userData);
            localStorage.setItem("token", registartionRes["token"]);
            localStorage.setItem("userName", userData.firstname);
            localStorage.setItem("userSurname", userData.surname);
          } 
          catch (error) {
            console.log(error);
          }
          this.router.navigate(["/news"]);
        } else {
          this.loginExist = false;
          this.inputLogin = false;
          this.placeholderPassword="";
        }
        } 
    catch (error) {
        console.log(error);
      }
    }
    
  }

  onTogglePassword() {
    this.type = this.type == "password" ? "text" : "password";
    console.log(this.type);
  }
}
