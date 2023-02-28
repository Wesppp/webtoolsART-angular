import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "../actions/getArticle.action";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { ArticleService as SharedArticleService } from "../../../shared/services/article.service";

@Injectable()
export class GetArticleEffect {

  constructor(private actions$: Actions,
              private sharedArticleService: SharedArticleService) {}

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),
    switchMap(({ articleId }) => {
      return this.sharedArticleService.getArticle(articleId).pipe(
        map((article: ArticleInterface) => {
          return getArticleSuccessAction({ article })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(getArticleFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))
}
