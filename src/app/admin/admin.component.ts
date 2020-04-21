import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  path = "";
  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll("adminpart")))
      .subscribe((data) => {
        console.log(data);
        this.path = data;
      });
  }
}
