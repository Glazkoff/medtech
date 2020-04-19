import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminEditorComponent } from "./admin-editor/admin-editor.component";
import { HttpClientModule } from "@angular/common/http";
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseViewerComponent } from './course-viewer/course-viewer.component';
import { CourseMaterialComponent } from './course-material/course-material.component';
import {NewsComponent} from "./news/news.component";
import { NewComponent } from './new/new.component';
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AuthorizationComponent,
    RegistrationComponent,
    AdminComponent,
    AdminEditorComponent,
    MyCoursesComponent,
    CourseCardComponent,
    CourseViewerComponent,
    CourseMaterialComponent,
    NewsComponent,
    NewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
