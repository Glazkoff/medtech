import { Component, OnInit, Input } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as moment from "moment";
import * as jwt_decode from "jwt-decode";

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
  now = moment();
  flag = true;
  placeholderComment="Ваш комментарий"
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
          date_comment: moment (element.date_comment).locale('ru').utcOffset("+0300").format(' DD MMMM YYYY, HH:mm'),
          text_comment: element.text_comment,
          id_materials: element.id_materials,
          author_id: element.author_id,
          name_commentator: element.user.firstname,
        };
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
    let comment_add_array;
    if (localStorage.getItem("userName") !== null) {
      this.name = localStorage.getItem("userName");
      let userData = jwt_decode(localStorage.getItem("token"));
      localStorage.getItem("token");
      comment_add_array = {
        name_commentator: userData.firstname,
        author_id: userData.id_users,
        text_comment: this.myFirstReactiveForm.value.comment,
        id_materials: this.id,
        date_comment: moment (this.now).locale('ru').utcOffset("+0300").format(' DD MMMM YYYY, HH:mm'),
      };
      comment_add = {
        author_id: userData.id_users,
        text_comment: this.myFirstReactiveForm.value.comment,
        id_materials: this.id,
      };
      try {
        let comm = await this.api.post(
          JSON.stringify(comment_add),
          "/comments"
        );
        this.comments.push(comment_add_array);
        this.myFirstReactiveForm.patchValue({comment: ''});
      } catch (error) {
        console.log(error);
      }
    } else {
      this.flag = false;
      this.placeholderComment= "";
      this.myFirstReactiveForm.patchValue({comment: ''});
     }
  }

  async getComments() {
    let response;
    try {
      response = await this.api.get(`/comments/${this.id}`);
    } catch (error) {
      console.log(error);
    }
    return response;
  }
}
