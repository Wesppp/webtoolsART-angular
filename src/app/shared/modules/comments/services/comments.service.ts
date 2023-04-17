import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CommentInterface} from "../../../types/comment.interface";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentRequestInterface} from "../../../types/commentRequest.interface";
import {GetCommentsResponseInterface} from "../types/getCommentsResponse.interface";

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) { }

  getArticleComments(slug: string): Observable<GetCommentsResponseInterface> {
    const url = environment.apiUrl + `/comments/${slug}`

    return this.http.get<GetCommentsResponseInterface>(url)
  }

  addCommentToArticle(request: CommentRequestInterface): Observable<CommentInterface> {
    const { slug, text } = request
    const url = environment.apiUrl + `/comments/${slug}`

    return this.http.post<CommentInterface>(url, { text })
  }

  deleteComment(slug: string): Observable<CommentInterface> {
    const url = environment.apiUrl + `/comments/${slug}`

    return this.http.delete<CommentInterface>(url)
  }

  updateComment(request: CommentRequestInterface): Observable<CommentInterface> {
    const { slug, text } = request
    const url = environment.apiUrl + `/comments/${slug}`

    return this.http.put<CommentInterface>(url, { text })
  }
}
