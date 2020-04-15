import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  { path: "authorization", component: AuthorizationComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "admin", component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
