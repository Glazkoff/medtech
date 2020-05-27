import { Component, OnInit, Input } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as moment from "moment";
import jwt from "jwt-client";


@Component({
  selector: "app-comment-viewer",
  templateUrl: "./comment-viewer.component.html",
  styleUrls: ["./comment-viewer.component.css"],
})
export class CommentViewerComponent implements OnInit {
  myFirstReactiveForm: FormGroup;
  @Input() comment;
  comments = [];
  private subscription: Subscription;
  name: any;
  id: number;
  constructor(
    private api: BaseApiService,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.subscription = activateRoute.params.subscribe((params) => {
      this.id = +params.id;
    });
  }

  async ngOnInit() {
    this.initForm();
    let commentsarr = await this.getComments();
    if (Array.isArray(commentsarr)) {
      commentsarr.forEach((element) => {
        let el = {
          id_comment: element.id_comment,
          name_commentator: element.name_commentator,
          text_comment: element.text_comment,
          date_comment: element.date_comment,
          id_materials: element.id_materials,
        };
        moment.locale("ru");
        this.comments.push(el);
      });
    }
  }
  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      comment: [""],
    });
  }

  async onSave() {
    let comment_add;
    console.log();
    if (localStorage.getItem("userName") !== null) {
      this.name = localStorage.getItem("userName");
      //Наденька, в объекте userData лежит вся информация о пользователе, 
      // в том числе и айди
      // Получай его из объекта и делай с ним, что пожелаешь
      let userData = jwt.read(localStorage.getItem("token")).claim;
      console.log(userData);
      



      comment_add = {
        name_commentator: this.name,
        text_comment: this.myFirstReactiveForm.value.comment,
        id_materials: this.id,
        date_comment: "Только что",
      };
      try {
        let comm = await this.api.post(
          JSON.stringify(comment_add),
          "/comments"
        );
        this.comments.push(comment_add);
        console.log(this.comments);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getComments() {
    let response;
    try {
      response = await this.api.get(`/comments/${this.id}`);
      console.log("RESPONSE");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return response;
  }
}
