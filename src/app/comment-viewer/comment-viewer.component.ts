import { Component, OnInit, Input } from '@angular/core';
import { BaseApiService } from '../services/base-api.service';
import { Comment } from '../services/comment.model';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnInit {
  myFirstReactiveForm: FormGroup
  @Input() comment
  comments: Comment[] = [];
  private subscription: Subscription;
  constructor(private api: BaseApiService, private fb: FormBuilder, private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }
  resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`);

  };
  id: number;
  async ngOnInit() {
    this.initForm();
    let commentsarr = await this.getComments();
    let id_new = await this. getUrlVar();
    if (Array.isArray(commentsarr)) {
      commentsarr.forEach((element) => {
        let el: Comment = {
          id_comment: element.id_comment,
          name_commentator: element.name_commentator,
          text_comment: element.text_comment,
          date_comment: element.date_comment,
          id_materials: element.id_materials,
        };
        if (id_new == element.id_materials){this.comments.push(el);}
      });
    }
  }
  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      comment: ['']
    });
  }
  async onSave() {
    let comment_add;
    comment_add = {
      name_commentator: this.myFirstReactiveForm.value.comment,
      text_comment: this.myFirstReactiveForm.value.comment,
      id_materials: this.id,
    };
    try {
      let comm = await this.api.post(
        JSON.stringify(comment_add), "/comments");
    }
    catch (error) {
      console.log(error);
    }
  }
    async getComments() {
      let response;
       try {
         response = await this.api.get("/comments");
         console.log("RESPONSE");
         console.log(response);
       } catch (error) {
         console.log(error);
       }
       return response;
     }

      getUrlVar() {
      var path = window.location.pathname; // получаем параметры из урла
      var arrayVar = []; // массив для хранения переменных
      arrayVar = path.split('/'); // разбираем урл на параметры
      let i = arrayVar[2];
      return i; // возвращаем результат

  }


}
