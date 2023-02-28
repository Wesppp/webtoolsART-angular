import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ArticleInterface } from "../../shared/types/article.interface";
import {
  InputArticleRequestInterface
} from "../../shared/types/inputArticleRequest.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class CreateArticleService {

  constructor(private http: HttpClient) { }

  createArticle(data: InputArticleRequestInterface): Observable<ArticleInterface> {
    const url = environment.apiUrl + '/articles'

    return this.http.post<ArticleInterface>(url, data)
  }
}
