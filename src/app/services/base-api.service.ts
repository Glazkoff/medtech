import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BaseApiService {
  headers = new HttpHeaders({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: localStorage.getItem("token") || "",
  });

  constructor(private http: HttpClient) {}

  private getUrl(url: string = ""): string {
    return "http://localhost:3001/api" + url;
  }
  public get(url) {
    return this.http
      .get(this.getUrl(url), { headers: this.headers })
      .toPromise();
  }
  public post(data, url) {
    return this.http
      .post(this.getUrl(url), data, {
        headers: this.headers,
      })
      .toPromise();
  }
  // "base api";
  public put(data, url) {
    console.log("base api");
    console.log(data);
    this.http
      .put(this.getUrl(url), data, { headers: this.headers })
      .toPromise();
  }
  public delete(url) {
    return this.http.delete(this.getUrl(url), { headers: this.headers });
  }
}
