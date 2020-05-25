import { Component, OnInit } from "@angular/core";
// import {NewsService} from '../add/news.service';
import { NewsGet } from "../add/news.get";
import { BaseApiService } from "../services/base-api.service";
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  posts: NewsGet[] = [];
  constructor(private api: BaseApiService) {}

  async ngOnInit() {
    let postsarr = await this.getPosts();
    if (Array.isArray(postsarr)) {
      postsarr.forEach((element) => {
        let el: NewsGet = {
          id: element.id_materials,
          title: element.title,
          date: element.date,
          duration: element.duration,
          type: element.type,
          content: element.content,
        };
        this.posts.push(el);
      });
     for (let i = 0; i <= postsarr.length; i++) {
       console.log(postsarr.length);
       this.jsonParse(JSON.parse(postsarr[i].content));
     };
    }
  }

  async getPosts() {
    // this.NewsServ.getPosts().then(() =>
    //   (this.NewsServ.posts).forEach(post => this.posts.push(post))
    // );
    let response;
    try {
      response = await this.api.get("/posts");
      console.log("RESPONSE");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return response;
  }
  async jsonParse(cont) {
    let html = '';
    // for (let i = 0; i <= this.posts.length; i++) {
      cont.forEach((content) => {
      switch (content.type) {
        case 'paragraph':
          html += `<p>${content.data.text}</p>`;
          break;
      }
    });
    console.log('html: ', html);
    // document.getElementById('paragraph_content' + this.posts[i].id).innerHTML = html;
    // };
  }
}
