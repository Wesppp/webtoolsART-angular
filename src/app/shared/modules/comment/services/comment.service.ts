import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {CommentRequestInterface} from "../../../types/commentRequest.interface";
import {CommentInterface} from "../../../types/comment.interface";

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  replyComment(request: CommentRequestInterface): Observable<CommentInterface> {
    const { slug, text } = request
    const url = environment.apiUrl + `/comments/replies/${slug}`

    return this.http.post<CommentInterface>(url, { text })
  }

  getCommentReplies(slug: string): Observable<CommentInterface[]> {
    const url = environment.apiUrl + `/comments/replies/${slug}`

    return this.http.get<CommentInterface[]>(url)
  }
}
