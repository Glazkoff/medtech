import { Component, OnInit } from '@angular/core';
import { BaseApiService } from "../services/base-api.service";
import * as moment from "moment";
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  posts = [];
  constructor(private api: BaseApiService) {}
  env = environment;
  postsarr: any;
  async ngOnInit() {
    let postsarr = await this.getPosts();
    if (Array.isArray(postsarr)) {
      postsarr.forEach((element) => {
        let el = {
          id: element.id_materials,
          title: element.title,
          date: moment(parseInt(element.date))
            .utcOffset("+0300")
            .format(" DD.MM.YYYY"),
          // duration: element.duration,
          type: element.type,
          content: element.content,
          main_image: element.main_image,
          author: element.author,
        };
        this.posts.push(el);
      });
      // for (let i = 0; i <= postsarr.length; i++) {
      //   console.log(postsarr.length);
      //   try {
      //     if (postsarr[i] !== undefined) {
      //       this.jsonParse(JSON.parse(postsarr[i].content));
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
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
  async deleteFavourite() {
  }
  // async jsonParse(cont) {
  //   let html = "";
  //   // for (let i = 0; i <= this.posts.length; i++) {
  //   cont.forEach((content) => {
  //     switch (content.type) {
  //       case "paragraph":
  //         html += `<p>${content.data.text}</p>`;
  //         break;
  //     }
  //   });
  //   // console.log('html: ', html);
  //   // document.getElementById('paragraph_content' + this.posts[i].id).innerHTML = html;
  //   // };
  // }
}
