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
  memory;
  fieldRequired = true;
  loginExist = true;
  tryForLogin=""
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
      organization: new FormControl("", []),
      role: new FormControl("", []),
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
          this.placeholderName="";
        }
      if (this.myForm.value.surname == "") {
            this.fieldRequired = false;
            this.placeholderSurname="";
        } 
     
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
      this.loginExist = true;
      
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
      try {
        let registartionRes = await this.api.post(
        JSON.stringify(infoAboutNewUser), "/users");
         if (registartionRes["token"]) {
          try {
            let userData = jwt.read(registartionRes["token"]).claim;
            console.log(jwt.read(registartionRes["token"]).claim);
            
            localStorage.setItem("token", registartionRes["token"]);
            localStorage.setItem("userName", userData.firstname);
            localStorage.setItem("userSurname", userData.surname);
            
          } 
          
          catch (error) {
            console.log(error);
          }
          this.router.navigate(["/news"]);  
        } else {
          this.memory =  this.myForm.value.login ;
          // console.log(this.memory);
          this.myForm.patchValue({login: ''});
          this.placeholderLogin="";
          this.loginExist = false;
        }
        } 
    catch (error) {
        console.log(error);
      }
    }
    
  }

  onTogglePassword() {
    this.type = this.type == "password" ? "text" : "password";
  }
 viewOldLogin(){
   if (!this.loginExist){
    this.myForm.patchValue({login: this.memory});
   }
  }
  }
