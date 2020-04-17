import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {

  constructor(private router: Router) { }
  backToMyCourses(){     
    this.router.navigate(['/my-courses']);
}
  ngOnInit() {
  }

}
