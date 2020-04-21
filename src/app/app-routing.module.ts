import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AdminComponent } from "./admin/admin.component";
import { MyCoursesComponent } from "./my-courses/my-courses.component";
import { CourseViewerComponent } from "./course-viewer/course-viewer.component";
import { NewsComponent } from "./news/news.component";
import { NewComponent } from "./new/new.component";
const routes: Routes = [
  { path: "authorization", component: AuthorizationComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/:adminpart", component: AdminComponent },
  { path: "admin/:adminpart/:id", component: AdminComponent },
  { path: "my-courses", component: MyCoursesComponent },
  { path: "course-viewer", component: CourseViewerComponent },
  { path: "news", component: NewsComponent },
  { path: "new/:id", component: NewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
