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
  // type = "password";
  // typeA = "password";
  myForm: FormGroup;
  values = "";
  memory;
  fieldRequired = true;
  loginExist = true;
  tryForLogin = "";
  // placeholderPassword='Введите пароль';
  // placeholderPasswordA='Повторите пароль';
  userData = jwt_decode(localStorage.getItem("token"));
  loading = false;
  Res;

  constructor(private api: BaseApiService, private router: Router) {}

  async ngOnInit() {
    // let arr = await this.getInfoUser();
    //   arr.forEach((element) => {
    //     let el = {
    //       id_users: element.id_users,
    //       name: element.firstname,
    //       surname: element.surname,
    //       organization: element.organization,
    //       role: element.role,
    //       login: element.login,
    //     };
    //     this.users.push(el);
    //  });
      this.myForm = new FormGroup({
      name: new FormControl(this.userData.firstname, [Validators.required]),
      surname: new FormControl(this.userData.surname, [Validators.required]),
      organization: new FormControl(this.userData.organization, []),
      role: new FormControl(this.userData.role, []),
      // password: new FormControl("", [Validators.required]),
      // passwordA: new FormControl("", [Validators.required]),
    });
    // this.loading = true;
    let arr = await this.getInfoUser();
      arr.forEach((element) => {
        let el = {
          id_users: element.id_users,
          name: element.firstname,
          surname: element.surname,
          organization: element.organization,
          role: element.role,
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
      console.log ("fffffffff");
      console.log("RESPONSE");
      console.log(response);
      this.loading = false;
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

      // if (this.myForm.value.password == "") {
      //   this.fieldRequired = false;
      //   this.placeholderPassword = '';
      // }
      // if (this.myForm.value.passwordA == "") {
      //   this.fieldRequired = false;
      //   this.placeholderPasswordA = '';
      //   console.log("АААААААА");
      // }
    } else {
        
        this.fieldRequired = true;
  
        let infoAboutUser;
        infoAboutUser = {
          firstname: this.myForm.value.name,
          surname: this.myForm.value.surname,
          // password: this.myForm.value.password,
          organization: this.myForm.value.organization,
          role: this.myForm.value.role,
        };
        // this.type = "password";
        console.log(infoAboutUser);
        try {
          this.Res = await this.api.put(
            JSON.stringify(infoAboutUser),
            `/users/ ${id}`
          );
          console.log("xxxxxxx");
          console.log(this.Res);
          this.router.navigate(["/profile"]);
        } catch (error) {
          console.log(error);
        }
      }
  }

  // onTogglePassword() {
  //   this.type = this.type == "password" ? "text" : "password";
  // }

  // onTogglePasswordAgain() {
  //   this.typeA = this.typeA == "password" ? "text" : "password";
  // }
  
}

