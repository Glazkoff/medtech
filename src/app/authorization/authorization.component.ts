import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  myForm :FormGroup;
  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'login': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9\.\*\!\@\#\,]*')]) 
    });
  }

  onClick() {
    console.log('Click!')
  }
}
