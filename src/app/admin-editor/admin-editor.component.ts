import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { BaseApiService } from "../services/base-api.service";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import { Router } from "@angular/router";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { environment } from "../../environments/environment";

const URL = environment.baseUrl + "/posts/photos";

let editor;
@Component({
  selector: "app-admin-editor",
  templateUrl: "./admin-editor.component.html",
  styleUrls: ["./admin-editor.component.css"],
})
export class AdminEditorComponent implements OnInit {
  constructor(private api: BaseApiService, public router: Router) {}
  @Input() data;
  @Input() id;
  @Input() fromList: boolean;
  title = "";
  duration = "30 минут";
  modal = false;
  editorData = {
    blocks: [],
  };
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "image",
  });
  async ngOnInit() {
    console.log("DATAONINIT: ", this.data);
    if (this.data !== undefined) {
      this.editorData = {
        blocks: this.data.blocks,
      };
    }
    if (!this.fromList) {
      editor = new EditorJS({
        /* Id элемента, который будет содержать редактор */
        holderId: "editorjs",
        tools: {
          header: Header,
          list: List,
          table: {
            class: Table,
          },
          image: SimpleImage,
          embed: Embed,
          quote: Quote,
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
        },
        data: this.editorData,
        autofocus: true,
        placeholder: "Напиши сюда лучшую статью!",
        // Раскомментировать на продакшен:
        // logLevel: "ERROR",
      });
    }
    try {
      await editor.isReady;
      console.log("Editor.js корректно загружен");
    } catch (reason) {
      console.log(`Editor.js загрузка сломалась по причине ${reason}`);
    }
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log("Uploaded File Details:", item);
      // this.toastr.success("File successfully uploaded!");
    };
  }
  async ngOnChanges(changes: SimpleChanges) {
    console.log("DATAONINIT: ", this.data);
    if (this.data !== undefined) {
      this.editorData = {
        blocks: this.data.blocks,
      };
      this.title = this.data.title;
      this.duration = this.data.duration;
      document.getElementById("editorjs").innerHTML = "";
      editor = new EditorJS({
        /* Id элемента, который будет содержать редактор */
        holderId: "editorjs",
        tools: {
          header: Header,
          list: List,
          table: {
            class: Table,
          },
          image: SimpleImage,
          embed: Embed,
          quote: Quote,
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
        },
        data: this.editorData,
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
  }
  onSave() {
    editor
      .save()
      .then((outputData) => {
        const postData = {
          title: this.title,
          duration: this.duration,
          content: outputData,
        };
        this.api.post(JSON.stringify(postData), "/posts");
        this.router.navigate(["/admin"]);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }

  onUpdate() {
    editor
      .save()
      .then(async (outputData) => {
        const postData = {
          title: this.title,
          duration: this.duration,
          content: outputData,
        };
        await this.api.put(JSON.stringify(postData), "/posts/" + this.id);
        this.router.navigate(["/admin", "editarticle"]);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
  async onDeleteAsk() {
    this.modal = true;
  }
  async onDelete() {
    console.log(await this.api.delete("/posts/" + this.id).subscribe());
    this.router.navigate(["/admin", "editarticle"]);
  }
  onCloseModal() {
    this.modal = false;
  }
}
