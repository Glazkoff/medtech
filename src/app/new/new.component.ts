import { Component, OnInit } from '@angular/core';
import {NewGet} from "../add/new.get";
import {BaseApiService} from "../services/base-api.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  post: any;
  private subscription: Subscription;
  constructor(private api: BaseApiService, private activateRoute: ActivatedRoute) {

    this.subscription = activateRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

id: number;
  async ngOnInit() {
    if (this.id) {
      const postsarr = await this.getPost();
      // if ( await postsarr.id === this.id) {
      //   const el: NewGet = {
      //     title: await postsarr.title,
      //     id: await postsarr.id_materials,
      //     content: await postsarr.content,
      //   };
      //   this.post = el;
      // }
    }
  }

  async getPost() {
    let response;
    try {
      response = await this.api.get("/posts/"+this.id);
      console.log("RESPONSE");
      console.log(response);
      this.jsonParse(JSON.parse(response[0].content));
    } catch (error) {
      console.log(error);
    }
    return response;
  }
  async jsonParse(cont) {
    let html = '';
    cont.forEach((content) => {
      switch (content.type) {
        case 'header':
          html += `<h${content.data.level}>${content.data.text}</h${content.data.level}>`;
          break;
        case 'paragraph':
          html += `<p>${content.data.text}</p>`;
          break;
        case 'delimiter':
          html += '<hr />';
          break;
        case 'image':
          html += `<img class="img-fluid" src="${content.data.file.url}" title="${content.data.caption}" /><br /><em>${content.data.caption}</em>`;
          break;
        case 'list':
          html += '<ul>';
          content.data.items.forEach((li) => {
            html += `<li>${li}</li>`;
          });
          html += '</ul>';
          break;
        default:
          console.log('Unknown block type', content.type);
          console.log(content);
          break;
      }

    });
    console.log('html: ', html);
    document.getElementById('article_content').innerHTML = html;
  }
}
