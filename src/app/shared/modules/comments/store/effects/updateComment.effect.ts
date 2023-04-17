import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CommentsService} from "../../services/comments.service";
import {catchError, map, of, switchMap} from "rxjs";
import {CommentInterface} from "../../../../types/comment.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {
  updateCommentAction,
  updateCommentFailureAction,
  updateCommentSuccessAction
} from "../actions/updateComment.action";

@Injectable()
export class UpdateCommentEffect {

  constructor(private actions$: Actions,
              private commentsService: CommentsService) {}

  updateComment$ = createEffect(() => this.actions$.pipe(
    ofType(updateCommentAction),
    switchMap(({ request }) => {
      return this.commentsService.updateComment(request).pipe(
        map((comment: CommentInterface) => {
          return updateCommentSuccessAction({ comment })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateCommentFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))
}
