import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { CreateArticleService } from "../../services/create-article.service";
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "../actiions/createArticle.action";

@Injectable()
export class CreateArticleEffect {

  constructor(private actions$: Actions,
              private createArticle: CreateArticleService,
              private router: Router) {}

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleAction),
    switchMap(({ request }) => {
      return this.createArticle.createArticle(request).pipe(
        map((article: ArticleInterface) => {
          return createArticleSuccessAction({ article })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(createArticleFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))

  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
      ofType(createArticleSuccessAction),
      tap(({ article }) => {
        this.router.navigate(['/'])
      })
    ),
    {dispatch: false}
  )
}
