import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseApiService } from '../services/base-api.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user;
  users = [];
  constructor(private api: BaseApiService, private router: Router) { }

  async ngOnInit() {
    let commentsarr = await this.getInfoUser();
      commentsarr.forEach((element) => {
        let el = {
          id_users: element.id_users,
          firstname: element.firstname,
          surname: element.surname,
          organization: element.organization,
          role: element.role,
          login: element.login, 
        };
        this.users.push(el);
     });
  }
  

  async getInfoUser() {
    let userData = jwt_decode(localStorage.getItem("token"));
    let id = userData.id_users;
    let response;
    try {
      response = await this.api.get(`/users/${id}`);
      console.log("RESPONSE");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  async onEdit(){
    this.router.navigate(["/profile-edit"]);
  }

}
