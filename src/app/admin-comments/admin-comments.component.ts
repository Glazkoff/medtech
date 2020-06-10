import { Component, OnInit } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import * as moment from "moment";

@Component({
  selector: "app-admin-comments",
  templateUrl: "./admin-comments.component.html",
  styleUrls: ["./admin-comments.component.css"],
})
export class AdminCommentsComponent implements OnInit {
  loading = false;
  modal = false;
  comments = [];
  deleteComment = {
    id_comment: 0,
    date_comment: "",
    text_comment: "",
    id_materials: 0,
    author_id: 0,
    material: {
      id_materials: 0,
      title: "",
    },
  };
  constructor(private api: BaseApiService) {}

  async loadComments() {
    this.loading = true;
    try {
      this.comments = [];
      const resp = await this.api.get("/comments/all");
      // if (resp.hasOwnProperty(length)) {
      for (let index = 0; index < resp["length"]; index++) {
        const comment = resp[index];
        comment.date_comment = moment(comment.date_comment)
          .utcOffset("+0300")
          .format(" DD.MM.YYYY");
        this.comments.push(comment);
      }
      // }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  preClose(comment) {
    this.deleteComment = comment;
    this.modal = true;
  }
  onCloseModal() {
    this.modal = false;
  }
  async onDelete() {
    try {
      await this.api
        .delete("/comments/" + this.deleteComment.id_comment)
        .toPromise();
      this.modal = false;
      this.loadComments();
    } catch (error) {
      console.log(error);
      this.loadComments();
    }
  }
  async ngOnInit() {
    this.loadComments();
  }
}
