import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class DeleteArticleService {

  constructor(private http: HttpClient) { }

  deleteArticle(articleId: string): Observable<{}> {
    const url = environment.apiUrl + `/articles/${articleId}`

    return this.http.delete<{}>(url)
  }
}
