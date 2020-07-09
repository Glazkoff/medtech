import { Component, OnInit } from '@angular/core';
import {BaseApiService} from "../services/base-api.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import * as moment from "moment";
import {environment} from "../../environments/environment";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
})
export class NewComponent implements OnInit {
  posts = [];
  showBtnFavour = false;
  favourOrNot = true;
  private subscription: Subscription;
  id: number;
  env = environment;
  loading = false;
  constructor(
    private api: BaseApiService,
    private activateRoute: ActivatedRoute
  ) {
    this.subscription = activateRoute.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  async ngOnInit() {
    this.loading = true;
    if (this.id) {
      const postsarr = await this.getPost();
      if (localStorage.getItem("token") !== null) {
        this.showBtnFavour = true;
        let response;
        try {
          response = await this.api.get(`/favourite-materials`);
          let all = response[0].materials;

          let index = all.findIndex((el) => {
            return el.id_materials == this.id;
          });
          if (index == -1) {
            this.favourOrNot = true;
          } else this.favourOrNot = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.showBtnFavour = false;
      }
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
    if (!this.id) {
  this.loading = false;
}
  }

  async getPost() {
    let response;
    try {
      response = await this.api.get("/posts/" + this.id);
      this.loading = false;
      this.jsonParse(JSON.parse(response[0].content));
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
          html += `<h${content.data.level} style="font-style: normal; font-weight: bold; font-size: 32px; line-height: 32px; color: #944545; margin-top: 0px; margin-bottom: 25px;">${content.data.text}</h${content.data.level}>`;
          break;
        case "paragraph":
          html += `<p style=" word-break: break-word; font-family: PT Astra Serif; font-style: normal; font-weight: normal; font-size: 20px; line-height: 24px; color: #000000;">${content.data.text}</p>`;
          break;
        case "delimiter":
          html += '<hr style="color: #944545;"/>';
          break;
        case "quote":
          html += `<span style="font-family: PT Astra Serif; font-size: 20px; line-height: 24px; color: #944545; font-style: italic">«${content.data.text}» (${content.data.caption})</span>`;
          break;
        case "table":
          html += '<table style="font-family: PT Astra Serif; font-size: 20px; border-collapse: collapse; margin: 10px; margin-left: 0px;" >';
          for (let i = 0; i < content.data.content.length; i++) {
            html += '<tr style="border-style: solid; border-width: 1px 1px 1px 1px; border-color: #944545;">';
            content.data.content[i].forEach((k) => {
              html += `<td style="border-style: solid; border-width: 1px 1px 1px 1px; border-color: #944545;padding: 5px">${k}</td>`;
            });
            html += "</tr>";
          }
          html += "</table>";
          break;
        case "image":
          html += `<div style=""><img  style=" width: 280px; height: 256px; border-radius: 2px; text-align:center;"src="${content.data.url}" title="${content.data.caption}"/><figcaption style="font-style: normal; font-weight: bold; font-size: 14px; line-height: 16px; text-align: right; color: #94624D;">${content.data.caption}</figcaption></div>`;
          break;
        case "embed":
          html += `<iframe width="${content.data.width}" height="${content.data.height}" src="${content.data.embed}" frameborder="0" allowfullscreen></iframe><figcaption style="width:580px;border-bottom: 2px solid darkgray;padding: 2px; text-align: center; text-transform: lowercase;">${content.data.caption}</figcaption>`;
          break;
        case "list":
          html += '<ul style="margin-left: 9px; padding-left: 0;">';
          content.data.items.forEach((li) => {
            html += `<li style="list-style: none; font-family: PT Astra Serif; font-style: normal; font-weight: normal; font-size: 20px; line-height: 24px; color: #000000;" > <span style="border-radius: 50%; background-color: #944545; height: 14px; width: 14px; margin-right: 7px; display: inline-block;"> </span>${li}</li>`;
          });
          html += "</ul>";
          break;
        default:
          break;
      }
    });
    document.getElementById("article_content").innerHTML = html;
  }

  async deleteFavourite() {
    try {
      let result = await this.api
        .delete(`/favourite-materials/${this.id}`)
        .subscribe();
      this.favourOrNot = true;
    } catch (error) {
      console.log(error);
    }
  }

  async addFavourite() {
    try {
      let result = await this.api.post([], `/favourite-materials/${this.id}`);
      this.favourOrNot = false;
    } catch (error) {
      console.log(error);
    }
  }
}
