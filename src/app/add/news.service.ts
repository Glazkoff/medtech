import {Injectable} from '@angular/core';
import {NewsGet} from './news.get';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  posts: NewsGet[] = [];
  link = 'http://localhost:3001';
  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(public http: HttpClient) {
  }

  async getPosts() {
    this.posts = [];
    const result = await this.http.get(this.link).toPromise();
    // tslint:disable-next-line:forin
    for (const index in result) {
      delete result[index].createdAt;
      delete result[index].updatedAt;
      this.posts.push(result[index]);
    }
  }}
