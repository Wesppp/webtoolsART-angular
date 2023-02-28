import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { DeleteArticleService } from "../../services/delete-article.service";
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction
} from "../actions/deleteArticle.action";
import { Router } from "@angular/router";

@Injectable()
export class DeleteArticleEffect {

  constructor(private actions$: Actions,
              private deleteArticleService: DeleteArticleService,
              private router: Router) {}

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap(({ articleId }) => {
      return this.deleteArticleService.deleteArticle(articleId).pipe(
        map(() => {
          return deleteArticleSuccessAction()
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(deleteArticleFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
      ofType(deleteArticleSuccessAction),
      tap(() => {
        this.router.navigate(['/'])
      })
    ),
    {dispatch: false}
  )
}
