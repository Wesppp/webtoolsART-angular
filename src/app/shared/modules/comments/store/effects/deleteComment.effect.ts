import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {
  deleteCommentAction,
  deleteCommentFailureAction,
  deleteCommentSuccessAction
} from "../actions/deleteComment.action";
import {CommentInterface} from "../../../../types/comment.interface";
import {CommentsService} from "../../services/comments.service";

@Injectable()
export class DeleteCommentEffect {

  constructor(private actions$: Actions,
              private commentsService: CommentsService) {}

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCommentAction),
    switchMap(({ slug }) => {
      return this.commentsService.deleteComment(slug).pipe(
        map((comment: CommentInterface) => {
          return deleteCommentSuccessAction({ comment })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(deleteCommentFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))
}
