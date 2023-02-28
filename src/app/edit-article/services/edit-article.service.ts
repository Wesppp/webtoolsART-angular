import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ArticleInterface } from "../../shared/types/article.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { InputArticleRequestInterface } from "../../shared/types/inputArticleRequest.interface";

@Injectable()
export class EditArticleService {

  constructor(private http: HttpClient) { }

  updateArticle(slug: string, article: InputArticleRequestInterface): Observable<ArticleInterface> {
    const url = environment.apiUrl + `/articles/${slug}`

    return this.http.put<ArticleInterface>(url, article)
  }
}
