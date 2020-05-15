import { Component, OnInit } from '@angular/core';
import {NewGet} from "../add/new.get";
import {BaseApiService} from "../services/base-api.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { AppService} from "../services/app.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})

export class NewComponent implements OnInit {
  myForm:FormGroup;
  post: any;
  private subscription: Subscription;
  constructor(private api: BaseApiService, private activateRoute: ActivatedRoute,service: AppService) {

    this.subscription = activateRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }
  id: number;

  // //function to resolve the reCaptcha and retrieve a token
  // async resolved(captchaResponse: string, res) {
  //   console.log(`Resolved response token: ${captchaResponse}`);
  //   await sendTokenToBackend(capchaResponse); //declaring the token send function with a token parameter
  // }

// //function to send the token to the node server
//   sendTokenToBackend(tok) {
//     //calling the service and passing the token to the service
//     this.service.sendToken(tok).subscribe(
//       data => {
//         console.log(data);
//       },
//       err => {
//         console.log(err);
//       },
//       () => {}
//     );
//   }
  async ngOnInit() {
    if (this.id) {
      const postsarr = await this.getPost();
      // if ( await postsarr.id === this.id) {
      //   const el: NewGet = {
      //     title: await postsarr.title,
      //     id: await postsarr.id_materials,
      //     content: await postsarr.content,
      //   };
      //   this.post = el;
      // }
    }
    this.myForm = new FormGroup({
      'name': new FormControl('', [ Validators.required]),
      'comment': new FormControl('', [Validators.required]),
    });
  }
  async onSave() {
    console.log('it was a click, wow')
    let comment;
    comment = {
      name_commentator: this.myForm.value.name,
      text_comment: this.myForm.value.comment,
      id_materials: this.id
    }
    console.log(comment);
    try {
      let com =  await this.api.post(JSON.stringify(comment), "/comments");
      console.log(com);
    } catch (error) {
      console.log(error);
    }
  }
  async getPost() {
    let response;
    try {
      response = await this.api.get("/posts/"+this.id);
      console.log("RESPONSE");
      console.log(response);
      this.jsonParse(JSON.parse(response[0].content));
    } catch (error) {
      console.log(error);
    }
    return response;
  }
  async jsonParse(cont) {
    let html = '';
    cont.forEach((content) => {
      switch (content.type) {
        case 'header':
          html += `<h${content.data.level}>${content.data.text}</h${content.data.level}>`;
          break;
        case 'paragraph':
          html += `<p>${content.data.text}</p>`;
          break;
        case 'delimiter':
          html += '<hr />';
          break;
        case 'quote':
          html += `<blockquote style="margin: 0; color: #231E28; padding: 30px 30px 30px 60px; border-left: 8px solid #CBDDE7; position: relative;font-family: 'Lato', sans-serif; font-weight: 300;"><p>${content.data.text}</p><cite>${content.data.caption}</cite></blockquote>`;
          break;
        case 'table':
          html += '<table>';
          for (let i = 0; i < content.data.content.length; i++) {
            html += '<tr>';
            content.data.content[i].forEach((k) => {
              html += `<td>${k}</td>`;
            });
            html += '</tr>';
          }
          html += '</table>';
          break;
        case 'image':
          html += `<div style="width:640px;text-align:center;"><img  src="${content.data.url}" title="${content.data.caption}"/><figcaption style="border-bottom: 2px solid darkgray;padding: 2px; text-align: center; text-transform: lowercase;">${content.data.caption}</figcaption></div>`;
          break;
        case 'embed':
          html += `<iframe width="${content.data.width}" height="${content.data.height}" src="${content.data.embed}" frameborder="0" allowfullscreen></iframe><figcaption style="width:580px;border-bottom: 2px solid darkgray;padding: 2px; text-align: center; text-transform: lowercase;">${content.data.caption}</figcaption>`;
          break;
        case 'list':
          html += '<ul>';
          content.data.items.forEach((li) => {
            html += `<li>${li}</li>`;
          });
          html += '</ul>';
          break;
        default:
          console.log('Unknown block type', content.type);
          console.log(content);
          break;
      }

    });
    console.log('html: ', html);
    document.getElementById('article_content').innerHTML = html;
  }
}
