import { Component, OnInit } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import * as moment from "moment";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.css"],
})
export class AdminUsersComponent implements OnInit {
  loading = false;
  users = [];
  deleteUser = {
    id_users: -1,
  };
  modal = false;
  constructor(private api: BaseApiService) {}
  async loadUsers() {
    this.loading = true;
    try {
      this.users = [];
      const resp = await this.api.get("/users/all");
      console.log(resp);
      // if (resp.hasOwnProperty(length)) {
      for (let index = 0; index < resp["length"]; index++) {
        const comment = resp[index];
        comment.createdAt = moment(comment.createdAt)
          .utcOffset("+0300")
          .format("DD.MM.YYYY");
        this.users.push(comment);
      }
      // }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }
  async setAdminStatus(user) {
    // let userObj = this.users.find((user) => user.id_users === user.id_users)
    user.is_admin = true;
    await this.api.put({ is_admin: true }, "/users/setadmin/" + user.id_users);
  }
  async unsetAdminStatus(user) {
    console.log("unsetAdminStatus: ", user.id_users);
    user.is_admin = null;
    await this.api.put({ is_admin: null }, "/users/setadmin/" + user.id_users);
  }
  onDeleteUser(user) {
    this.modal = true;
    this.deleteUser = user;
    console.log(user);
  }
  async sendDeleteUser() {
    await this.api.delete("/users/" + this.deleteUser.id_users).subscribe();
    this.modal = false;
    this.loadUsers();
  }
  onCloseModal() {
    this.modal = false;
  }
  ngOnInit() {
    this.loadUsers();
  }
}
