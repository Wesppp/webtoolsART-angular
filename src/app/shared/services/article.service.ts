import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ArticleInterface } from "../types/article.interface";

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticle(articleId: string): Observable<ArticleInterface> {
    const url = environment.apiUrl + `/articles/${articleId}`

    return this.http.get<ArticleInterface>(url)
  }
}
