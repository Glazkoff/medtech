import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myForm :FormGroup;
  values='';
  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl('', [ Validators.required, Validators.pattern('[a-zA-ZА-Яа-яёЁ]*')]),
      'surname': new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZА-Яа-яёЁ]*')]),
      'login': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9\.\*\!\@\#\,]*')]),
    });
  }


}