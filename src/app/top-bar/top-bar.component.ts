import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  flag=true;
  constructor() { }

  ngOnInit() {
  }
  openDropdownMenu(){
    if (this.flag) {
    
    }
    this.flag=!this.flag;
    
  }

}
