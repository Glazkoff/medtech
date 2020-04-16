import { Component, OnInit } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import { HttpClient } from "@angular/common/http";

let editor;
@Component({
  selector: "app-admin-editor",
  templateUrl: "./admin-editor.component.html",
  styleUrls: ["./admin-editor.component.css"],
})
export class AdminEditorComponent implements OnInit {
  constructor(private api: BaseApiService, private http: HttpClient) {}

  async ngOnInit() {
    editor = new EditorJS({
      /* Id элемента, который будет содержать редактор */
      holderId: "editorjs",
      tools: {
        header: Header,
        list: List,
        table: {
          class: Table,
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
      },
      autofocus: true,
      placeholder: "Напиши сюда лучшую статью!",
      // Раскомментировать на продакшен:
      // logLevel: "ERROR",
    });

    try {
      await editor.isReady;
      console.log("Editor.js корректно загружен");
    } catch (reason) {
      console.log(`Editor.js загрузка сломалась по причине ${reason}`);
    }
  }
  onSave() {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", JSON.stringify(outputData));
        this.api.post(JSON.stringify(outputData), "/posts");
        // this.http.post("http://localhost:3001", JSON.stringify(outputData));
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
}
