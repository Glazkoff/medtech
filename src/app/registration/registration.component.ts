import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseApiService } from '../services/base-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myForm :FormGroup;
  values='';
  flag = true;
  constructor(private api: BaseApiService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl('', [ Validators.required, Validators.pattern('[a-zA-ZА-Яа-яёЁ]*')]),
      'surname': new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZА-Яа-яёЁ]*')]),
      'organization': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required]),
      'login': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9\.\*\!\@\#\,]*')]),
    });
  }

  async onRegistr(){
    console.log('it was a click, wow')
    let infoAboutNewUser;
    infoAboutNewUser = {
        name: this.myForm.value.name,
        surname: this.myForm.value.surname,
        login: this.myForm.value.login,
        password: this.myForm.value.password,
        organization: this.myForm.value.organization,
        role: this.myForm.value.role
      }
    console.log(infoAboutNewUser);
    try {
        let ExistOrNot =  await this.api.post(JSON.stringify(infoAboutNewUser), "/users");
        console.log(ExistOrNot);
        if (ExistOrNot=="exist") {
                  this.flag = false;
                }
        else {
          this.flag = true;
          this.router.navigate(['/authorization']);
        }  
 
    } catch (error) {
      console.log(error);
    }
    }

}