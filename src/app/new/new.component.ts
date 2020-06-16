import { Component, OnInit } from '@angular/core';
import {NewGet} from "../add/new.get";
import {BaseApiService} from "../services/base-api.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { AppService} from "../services/app.service";
import * as moment from "moment";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
})
export class NewComponent implements OnInit {
  post = [];
  showBtnFavour = false;
  favourOrNot = true;
  private subscription: Subscription;
  id: number;
  constructor(
    private api: BaseApiService,
    private activateRoute: ActivatedRoute
  ) {
    this.subscription = activateRoute.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  async ngOnInit() {
    if (this.id) {
      const postsarr = await this.getPost();
      // this.showBtnFavour = true;
      if (localStorage.getItem("token") !== null) {
        this.showBtnFavour = true;
        let response;
        try {
          response = await this.api.get(`/favourite-materials`);
          let all = response[0].materials;
          console.log(all);

          let index = all.findIndex((el) => {
            return el.id_materials == this.id;
          });
          console.log("index");
          console.log(index);
          if (index == -1) {
            this.favourOrNot = true;
          } else this.favourOrNot = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.showBtnFavour = false;
      }

      // if ( await postsarr.id === this.id) {
      //   const el = {
      //     title: await postsarr.title,
      //     id: await postsarr.id_materials,
      //     content: await postsarr.content,
      //   };
      //   this.post.push(el);
      //   console.log("RESPONSEeee");
      //   console.log(this.post);
      // }
    }
  }

  async getPost() {
    let response;
    let title_new;
    let date_new;
    try {
      response = await this.api.get("/posts/" + this.id);
      console.log("RESPONSE");
      console.log(response);
      this.jsonParse(JSON.parse(response[0].content));
      title_new = response[0].title;
      date_new = moment(parseInt(response[0].date))
        .utcOffset("+0300")
        .format(" DD.MM.YYYY");
      this.post.push(title_new);
      this.post.push(date_new);
      console.log("post");
      console.log(this.post[0]);
    } catch (error) {
      console.log(error);
    }
    return response;
  }
  async jsonParse(cont) {
    let html = "";
    cont.forEach((content) => {
      switch (content.type) {
        case "header":
          html += `<h${content.data.level} style="font-style: normal; font-weight: bold; font-size: 32px; line-height: 32px; color: #944545;">${content.data.text}</h${content.data.level}>`;
          break;
        case "paragraph":
          html += `<p style="font-family: PT Astra Serif; font-style: normal; font-weight: normal; font-size: 20px; line-height: 24px; color: #000000;">${content.data.text}</p>`;
          break;
        case "delimiter":
          html += "<hr />";
          break;
        case "quote":
          html += `<blockquote style="margin: 0; color: #231E28; padding: 30px 30px 30px 60px; border-left: 8px solid #CBDDE7; position: relative;font-family: 'Lato', sans-serif; font-weight: 300;"><p>${content.data.text}</p><cite>${content.data.caption}</cite></blockquote>`;
          break;
        case "table":
          html += "<table>";
          for (let i = 0; i < content.data.content.length; i++) {
            html += "<tr>";
            content.data.content[i].forEach((k) => {
              html += `<td>${k}</td>`;
            });
            html += "</tr>";
          }
          html += "</table>";
          break;
        case "image":
          html += `<div style="width:640px;text-align:center;"><img  src="${content.data.url}" title="${content.data.caption}"/><figcaption style="border-bottom: 2px solid darkgray;padding: 2px; text-align: center; text-transform: lowercase;">${content.data.caption}</figcaption></div>`;
          break;
        case "embed":
          html += `<iframe width="${content.data.width}" height="${content.data.height}" src="${content.data.embed}" frameborder="0" allowfullscreen></iframe><figcaption style="width:580px;border-bottom: 2px solid darkgray;padding: 2px; text-align: center; text-transform: lowercase;">${content.data.caption}</figcaption>`;
          break;
        case "list":
          html += "<ul>";
          content.data.items.forEach((li) => {
            html += `<li>${li}</li>`;
          });
          html += "</ul>";
          break;
        default:
          console.log("Unknown block type", content.type);
          console.log(content);
          break;
      }
    });
    console.log("html: ", html);
    document.getElementById("article_content").innerHTML = html;
  }

  async deleteFavourite() {
    console.log("Зашли в функцию удаления статьи из избранного");
    try {
      console.log("Отправили запрос на удаление статьи из избранного");
      let result = await this.api
        .delete(`/favourite-materials/${this.id}`)
        .subscribe();
      this.favourOrNot = true;
    } catch (error) {
      console.log(error);
    }
  }

  async addFavourite() {
    console.log("Зашли в функцию добавление статьи в избранное");
    try {
      console.log("Отправили запрос на добавление статьи в избранное");
      let result = await this.api.post([], `/favourite-materials/${this.id}`);
      this.favourOrNot = false;
    } catch (error) {
      console.log(error);
    }
  }
}
