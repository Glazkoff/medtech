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
    if (Array.isArray(commentsarr)) {
      commentsarr.forEach((element) => {
        let el: Comment = {  
          id_comment: element.id_comment,
          name_commentator: element.name_commentator,
          text_comment: element.text_comment,
          date_comment: element.date_comment,
        };
        this.comments.push(el);
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


}
