import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BaseApiService {
  headers = new HttpHeaders("Content-Type: application/json; charset=UTF-8");

  constructor(private http: HttpClient) {}

  private getUrl(url: string = ""): string {
    return "http://localhost:3001/api" + url;
  }
  public get() {
    return this.http.get(this.getUrl(), { headers: this.headers });
  }
  public post(data, url) {
    return this.http
      .post(this.getUrl(url), data, {
        headers: this.headers,
      })
      .subscribe();
  }
  // "base api";
  public put(data, url) {
    console.log("base api");
    console.log(data);
    console.log(
      this.http.put(this.getUrl(url), data, { headers: this.headers })
    );
  }
  public delete(url) {
    return this.http.delete(this.getUrl(url), { headers: this.headers });
  }
}
