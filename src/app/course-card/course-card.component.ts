import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  finish_date = "2021-04-15"
  constructor() { }
  datePast() {
    let a = (new Date()).getTime()
    let b = (new Date(this.finish_date)).getTime()
    // let b = (new Date(this.item.timeEnd)).getTime()
    return a>b 
  }

  ngOnInit() {
  }

}
