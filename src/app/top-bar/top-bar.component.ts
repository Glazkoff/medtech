import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  flag=true;
  logOut = true;
  name="Арина";
  surname="Оськина";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck(){
    if (localStorage.getItem('userName') !== null) {
      this.name = localStorage.getItem('userName');
      console.log('Имя: ', this.name);
    }
    if (localStorage.getItem('userSurname') !== null) {
      this.surname = localStorage.getItem('userSurname');
      console.log('Фамилия: ', this.surname);
    }
    if (localStorage.getItem('log') !== null) {
      this.logOut=!this.logOut; 
      localStorage.removeItem('log'); 
    }
  }

  openDropdownMenu(){
    this.flag=!this.flag;  
  }
  onLogOut(){
    this.logOut=!this.logOut;  
    localStorage.clear();
    this.flag=!this.flag; 
    this.router.navigate(['/news']);
  }
}
