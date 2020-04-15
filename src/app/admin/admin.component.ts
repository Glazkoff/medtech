import { Component, OnInit } from "@angular/core";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

let editor;
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor() {}
  onSaveBtn() {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
  async ngOnInit() {
    editor = new EditorJS({
      /**
       * Id элемента, который будет содержать редактор
       */
      holderId: "editorjs",
      tools: {
        header: Header,
        list: List,
      },
      autofocus: true,
      placeholder: "Напиши сюда лучшую статью!",
    });

    try {
      await editor.isReady;
      console.log("Editor.js корректно загружен");
    } catch (reason) {
      console.log(`Editor.js загрузка сломалась по причине ${reason}`);
    }
  }
}
