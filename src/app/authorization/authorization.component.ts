import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseApiService } from '../services/base-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  flag=true;
  myForm :FormGroup;
  user = {
    id: 1,
    name: "",
    surname: "",
    organization: "",
    role: "",
    login: "",
    password: ""
  }
  constructor(private api: BaseApiService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'login': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9\.\*\!\@\#\,]*')]) 
    });
  }

 async onLogin() {
    console.log('it was a click, wow')
    let infoAboutUser;
    infoAboutUser = {
      login: this.myForm.value.login,
      password: this.myForm.value.password,
    }
      console.log(infoAboutUser);
    try {
      let ExistOrNot = await this.api.post(JSON.stringify(infoAboutUser), "/login");
      let name = ExistOrNot[0].firstname;
      console.log(`Name: ${name}`);
      
      if (ExistOrNot != "not exist") {
        this.user.id = +ExistOrNot[0].id_users;
        this.user.login = ExistOrNot[0].login;
        this.user.password = ExistOrNot[0].password;
        this.user.name = ExistOrNot[0].firstname;
        this.user.surname = ExistOrNot[0].surname;
        this.user.organization = ExistOrNot[0].organization;
        this.user.role = ExistOrNot[0].role; 
        console.log(this.user);       
        this.flag = true;
        localStorage.setItem('userName', this.user.name);
        localStorage.setItem('userSurname', this.user.surname);
        localStorage.setItem('log', "IN");
        this.router.navigate(['/my-courses']);
        
      } else {
        this.flag = false;
        console.log("Неверный логин или пароль");
      } 
    } catch (error) {
      console.log(error);
    }
   }
}
