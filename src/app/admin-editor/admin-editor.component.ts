import { Component, OnInit } from "@angular/core";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";

let editor;
@Component({
  selector: "app-admin-editor",
  templateUrl: "./admin-editor.component.html",
  styleUrls: ["./admin-editor.component.css"],
})
export class AdminEditorComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    editor = new EditorJS({
      /**
       * Id элемента, который будет содержать редактор
       */
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
      // initialBlock: "header",
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
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
}
