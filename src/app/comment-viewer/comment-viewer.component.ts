import { Component, OnInit, Input } from '@angular/core';
import { BaseApiService } from '../services/base-api.service';
import { Comment } from '../services/comment.model';

@Component({
  selector: 'app-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnInit {
  @Input() comment
  comments: Comment[] = [];
  constructor(private api: BaseApiService) { }
  
  async ngOnInit() {
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

      getUrlVar(){
      var path = window.location.pathname; // получаем параметры из урла
      var arrayVar = []; // массив для хранения переменных 
      arrayVar = path.split('/'); // разбираем урл на параметры
      let i = arrayVar[2];
      return i; // возвращаем результат
      
  }


}
