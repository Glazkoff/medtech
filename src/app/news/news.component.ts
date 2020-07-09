import { Component, OnInit } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import * as moment from "moment";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  posts = [];
  loading = false;
  constructor(private api: BaseApiService) {}
  env = environment;
  async ngOnInit() {
    this.loading = true;
    let postsarr = await this.getPosts();
    if (Array.isArray(postsarr)) {
      postsarr.forEach((element) => {
        let el = {
          id: element.id_materials,
          title: element.title,
          date: moment(parseInt(element.date))
            .utcOffset("+0300")
            .format(" DD.MM.YYYY"),
          type: element.type,
          content: element.content,
          main_image: element.main_image,
          author: element.author,
        };
        this.posts.push(el);
      });
    }
  }

  async getPosts() {
    let response;
    try {
      response = await this.api.get("/posts");
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
    return response;
  }
}
