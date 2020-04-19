import { Component, OnInit } from '@angular/core';
import {NewsGet} from "../add/news.get";
import {NewsService} from "../add/news.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  posts: NewsGet[] = [];
  constructor(private NewsServ: NewsService) { }


  ngOnInit() {
    this.getPosts();
    // this.jsonParse();
  }

  getPosts() {
    this.posts = [];
    this.NewsServ.getPosts().then(() =>
      (this.NewsServ.posts).forEach(post => this.posts.push(post))
    );
  }
  // Очень бы хотелось, чтобы это превращало json в html
  // jsonParse() {
  //   let html = '';
  //   this.posts.post.content.forEach(function(content){
  //     switch (content.type) {
  //       case 'header':
  //         html += `<h${content.data.level}>${content.data.text}</h${content.data.level}>`;
  //         break;
  //       case 'paragraph':
  //         html += `<p>${content.data.text}</p>`;
  //         break;
  //       case 'delimiter':
  //         html += '<hr />';
  //         break;
  //       case 'image':
  //         html += `<img class="img-fluid" src="${content.data.file.url}" title="${content.data.caption}" /><br /><em>${content.data.caption}</em>`;
  //         break;
  //       case 'list':
  //         html += '<ul>';
  //         content.data.items.forEach(function(li) {
  //           html += `<li>${li}</li>`;
  //         });
  //         html += '</ul>';
  //         break;
  //       default:
  //         console.log('Unknown block type', content.type);
  //         console.log(content);
  //         break;
  //     }
  //     document.getElementById('content').innerHTML = html;
  //   });
  //   console.log('html: ', html);
  // }
}
