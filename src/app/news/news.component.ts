import { Component, OnInit } from '@angular/core';
import {NewsService} from '../add/news.service';
import {NewsGet} from '../add/news.get';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  posts: NewsGet[] = [];
  constructor(private NewsServ: NewsService) { }


  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.posts = [];
    this.NewsServ.getPosts().then(() =>
      (this.NewsServ.posts).forEach(post => this.posts.push(post))
    );
  }

}
