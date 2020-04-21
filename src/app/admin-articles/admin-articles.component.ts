import { Component, OnInit, Input } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-admin-articles",
  templateUrl: "./admin-articles.component.html",
  styleUrls: ["./admin-articles.component.css"],
})
export class AdminArticlesComponent implements OnInit {
  constructor(private api: BaseApiService, private route: ActivatedRoute) {}
  id = "";
  data: any;
  @Input() path: string;
  posts = [];
  async ngOnInit() {
    try {
      // console.log((await this.api.get("/posts")).hasOwnProperty(length));
      this.route.paramMap
        .pipe(switchMap((params) => params.getAll("id")))
        .subscribe((data) => {
          console.log(data);
          this.id = data;
        });
      if (!this.id) {
        let resp = await this.api.get("/posts");
        if (await resp.hasOwnProperty(length)) {
          // tslint:disable-next-line: no-string-literal
          for (let index = 0; index < resp["length"]; index++) {
            console.log(resp[index]);
            this.posts.push(resp[index]);
          }
        }
      } else {
        let resp = await this.api.get("/posts/" + this.id);
        console.log(resp);
        this.data = {
          title: resp[0].title,
          blocks: JSON.parse(resp[0].content),
        };
        console.log("DATA: ", this.data);
      }
      // console.log(await response[0]);
    } catch (error) {
      console.log(error);
    }
  }
}
