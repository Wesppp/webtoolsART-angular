import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CommentService} from "../../services/comment.service";
import {catchError, map, of, switchMap} from "rxjs";
import {
  getCommentRepliesAction,
  getCommentRepliesFailureAction,
  getCommentRepliesSuccessAction
} from "../actions/getCommentReplies.action";
import {CommentInterface} from "../../../../types/comment.interface";

@Injectable()
export class GetCommentRepliesEffect {

  constructor(private actions$: Actions,
              private commentService: CommentService) {}

  getCommentReplies$ = createEffect(() => this.actions$.pipe(
    ofType(getCommentRepliesAction),
    switchMap(({ slug }) => {
      return this.commentService.getCommentReplies(slug).pipe(
        map((replies: CommentInterface[]) => {
          return getCommentRepliesSuccessAction({ replies })
        }),
        catchError(() => {
          return of(getCommentRepliesFailureAction())
        })
      )
    })
  ))
}
