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
  notfound = false;
  constructor(private api: BaseApiService) {}
  env = environment;
  postsarr: any;

  // *** ГОТОВО
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
     
    } else {
      this.notfound = true;
    }
  }
// ****

// *** ГОТОВО
  async getPosts() {
    console.log("Зашли в функцию получения избранного");
    let response;
    try {
      console.log("Отправили запрос на получение избранных статей");
      response = await this.api.get(`/favourite-materials`);
      console.log("Получение избранных статей: ");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return response;
  }
// ****

// *** ГОТОВО
  async deleteFavourite(id_materials) {
    console.log("Зашли в функцию удаления статьи из избранного");
    try {
      console.log("Отправили запрос на удаление статьи из избранного");
      let result = await this.api.delete(`/delete-favourites/${id_materials}`);
      let index = this.posts.findIndex((el)=>{
        return el.id==id_materials
      })
      console.log("Удаление статьи из избранного в масиве");
      this.posts.splice(index, 1);
      if (this.posts.length==0) {
        this.notfound=true;
      } 
    } catch (error) {
      console.log(error);   
    }
  }
 // ****
   
}
