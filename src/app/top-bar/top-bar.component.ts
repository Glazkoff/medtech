import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  flag=true;
  logOut = true;
  constructor() { }

  ngOnInit() {
  }
  openDropdownMenu(){
    this.flag=!this.flag;  
  }
  onLogOut(){
    this.logOut=!this.logOut;  
  }
}
