import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseApiService } from '../services/base-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  myForm :FormGroup;
  constructor(private api: BaseApiService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'login': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9\.\*\!\@\#\,]*')]) 
    });
  }

  onLogin() {
    console.log('Click!')
    // let login;
    // login = {
    //   login: this.myForm.value.login,
    //   password: this.myForm.value.password
    // }
    // this.api.post(JSON.stringify(login), "/login");
  }
}
