import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {CommentInterface} from "../../../../types/comment.interface";
import {replyCommentAction, replyCommentFailureAction, replyCommentSuccessAction} from "../actions/replyComment.action";
import {CommentService} from "../../services/comment.service";

@Injectable()
export class ReplyCommentEffect {

  constructor(private actions$: Actions,
              private commentService: CommentService) {}

  replyComment$ = createEffect(() => this.actions$.pipe(
    ofType(replyCommentAction),
    switchMap(({ request }) => {
      return this.commentService.replyComment(request).pipe(
        map((reply: CommentInterface) => {
          return replyCommentSuccessAction({ reply })
        }),
        catchError(() => {
          return of(replyCommentFailureAction())
        })
      )
    })
  ))
}
