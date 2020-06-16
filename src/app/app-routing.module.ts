import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AdminComponent } from "./admin/admin.component";
import { MyCoursesComponent } from "./my-courses/my-courses.component";
import { CourseViewerComponent } from "./course-viewer/course-viewer.component";
import { NewsComponent } from "./news/news.component";
import { NewComponent } from "./new/new.component";
import { AuthGuard } from "./services/auth.guard";
import { AuthAdminGuard } from "./services/auth-admin.guard";
import { FavouritesComponent } from "./favourites/favourites.component";
const routes: Routes = [
  { path: "authorization", component: AuthorizationComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthAdminGuard] },
  { path: "admin/:adminpart", component: AdminComponent, canActivate: [AuthAdminGuard] },
  { path: "admin/:adminpart/:id", component: AdminComponent, canActivate: [AuthAdminGuard] },
  { path: "my-courses", component: MyCoursesComponent, canActivate: [AuthGuard] },
  { path: "course-viewer", component: CourseViewerComponent },
  { path: "", component: NewsComponent },
  { path: "new/:id", component: NewComponent },
  { path: "favourites", component: FavouritesComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
