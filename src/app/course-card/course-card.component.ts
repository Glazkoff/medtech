import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseApiService } from '../services/base-api.service';
import { Course } from '../services/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course
  courses: Course[] = [];
  finish_date = "2021-04-15"
  constructor(private api: BaseApiService, private router: Router) { }
  goCourse(){     
    this.router.navigate(['/course-viewer']);
}
  datePast() {
    let a = (new Date()).getTime()
    let b = (new Date(this.finish_date)).getTime()
    // let b = (new Date(this.item.timeEnd)).getTime()
    return a>b 
  }

  async ngOnInit() {
    let coursesarr = await this.getCourses();
    if (Array.isArray(coursesarr)) {
      coursesarr.forEach((element) => {
        let el: Course = {
          id_courses: element.id_courses,
          title: element.title,
        };
        this.courses.push(el);
      });
    }
  }

    async getCourses() { 
      let response;
       try {
         response = await this.api.get("/courses");
         console.log("RESPONSE");
         console.log(response);
       } catch (error) {
         console.log(error);
       }
       return response;
     }

  
}
