import { Component, OnInit, Input } from '@angular/core';
import { BaseApiService } from '../services/base-api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  
  @Input() user;
  users = [];
  type = "password";
  typeA = "password";
  myForm: FormGroup;
  values = "";
  memory;
  fieldRequired = true;
  loginExist = true;
  tryForLogin = "";
  placeholderPassword='Введите пароль';
  placeholderPasswordA='Повторите пароль';
  userData = jwt_decode(localStorage.getItem("token"));
  valueName = this.userData.firstname;
  valueSurname = this.userData.surname;
  valueOrganization = this.userData.organization;
  valueRole = this.userData.role;

  constructor(private api: BaseApiService, private router: Router) {}

  async ngOnInit() {
      this.myForm = new FormGroup({
      name: new FormControl(this.valueName, [Validators.required]),
      surname: new FormControl(this.valueSurname, [Validators.required]),
      organization: new FormControl(this.userData.organization, []),
      role: new FormControl(this.valueRole, []),
      password: new FormControl("", [Validators.required]),
      passwordA: new FormControl("", [Validators.required]),
    });

    let arr = await this.getInfoUser();
      arr.forEach((element) => {
        let el = {
          id_users: element.id_users,
          name: element.firstname,
          login: element.login,
        };
        this.users.push(el);
     });

  }
  

  async getInfoUser() {
    let id = this.userData.id_users;
    let response;
    try {
      response = await this.api.get(`/users/${id}`);
      console.log("RESPONSE");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  async onSave() {
     this.fieldRequired = true;
     let id = this.userData.id_users;
    if (this.myForm.invalid) {
      if (this.myForm.value.name == "") {
        this.fieldRequired = false;
      }
      if (this.myForm.value.surname == "") {
        this.fieldRequired = false;
      }

      if (this.myForm.value.password == "") {
        this.fieldRequired = false;
        this.placeholderPassword = '';
      }
      if (this.myForm.value.passwordA == "") {
        this.fieldRequired = false;
        this.placeholderPasswordA = '';
        console.log("АААААААА");
      }
    } else {
      if (this.myForm.value.password == this.myForm.value.passwordA){
    
        this.fieldRequired = true;
  
        let infoAboutUser;
        infoAboutUser = {
          name: this.myForm.value.name,
          surname: this.myForm.value.surname,
          password: this.myForm.value.password,
          organization: this.myForm.value.organization,
          role: this.myForm.value.role,
        };
        this.type = "password";
        console.log(infoAboutUser);
        try {
          let registartionRes = await this.api.put(
            JSON.stringify(infoAboutUser),
            `/users/ ${id}`
          );
          this.router.navigate(["/profile"]);
        } catch (error) {
          console.log(error);
        }
      } else{

      }
      }
  }

  onTogglePassword() {
    this.type = this.type == "password" ? "text" : "password";
  }

  onTogglePasswordAgain() {
    this.typeA = this.typeA == "password" ? "text" : "password";
  }
  
}

