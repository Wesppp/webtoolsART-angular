import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CommentsService} from "../../services/comments.service";
import {catchError, map, of, switchMap} from "rxjs";
import {CommentInterface} from "../../../../types/comment.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {addCommentAction, addCommentFailureAction, addCommentSuccessAction} from "../actions/addComment.action";

@Injectable()
export class AddCommentEffect {

  constructor(private actions$: Actions,
              private commentsService: CommentsService) {}

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(addCommentAction),
    switchMap(({ request }) => {
      return this.commentsService.addCommentToArticle(request).pipe(
        map((comment: CommentInterface) => {
          return addCommentSuccessAction({ comment })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(addCommentFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))
}
