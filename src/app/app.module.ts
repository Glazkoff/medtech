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
import { MyCoursesComponent } from "./my-courses/my-courses.component";
import { CourseCardComponent } from "./course-card/course-card.component";
import { CourseViewerComponent } from "./course-viewer/course-viewer.component";
import { CourseMaterialComponent } from "./course-material/course-material.component";
import { NewsComponent } from "./news/news.component";
import { NewComponent } from "./new/new.component";
import { AdminArticlesComponent } from "./admin-articles/admin-articles.component";
import { CommentViewerComponent } from "./comment-viewer/comment-viewer.component";
import { PipeTimeCommentPipe } from "./pipes/pipe-time-comment.pipe";
import { AuthErrorHandler } from "./services/auth-error-handler";
import { ErrorHandler } from "@angular/core";
import { AuthGuard } from "./services/auth.guard";
import { LoaderComponent } from "./loader/loader.component";
import { ModalComponent } from "./modal/modal.component";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { MyDatePipePipe } from "./shared/pipes/my-date-pipe.pipe";
import { FileSelectDirective } from "ng2-file-upload";
import { FavouritesComponent } from './favourites/favourites.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
// import { FileUploadModule } from "ng2-file-upload";
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
    AdminArticlesComponent,
    CommentViewerComponent,
    PipeTimeCommentPipe,
    LoaderComponent,
    ModalComponent,
    MyDatePipePipe,
    FileSelectDirective,
    FavouritesComponent,
    AdminCommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule, //this is the recaptcha main module
    RecaptchaFormsModule, //this is the module for form incase form validation
    // FileUploadModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
