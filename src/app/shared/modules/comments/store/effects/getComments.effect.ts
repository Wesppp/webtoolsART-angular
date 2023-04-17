import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CommentsService} from "../../services/comments.service";
import {getCommentsAction, getCommentsFailureAction, getCommentsSuccessAction} from "../actions/getComments.action";
import {GetCommentsResponseInterface} from "../../types/getCommentsResponse.interface";

@Injectable()
export class GetCommentsEffect {

  constructor(private actions$: Actions,
              private commentsService: CommentsService) {}

  getComments$ = createEffect(() => this.actions$.pipe(
    ofType(getCommentsAction),
    switchMap(({ slug }) => {
      return this.commentsService.getArticleComments(slug).pipe(
        map((response: GetCommentsResponseInterface) => {
          return getCommentsSuccessAction({ comments: response.comments, totalCommentsCount: response.commentsCount })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(getCommentsFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))
}
