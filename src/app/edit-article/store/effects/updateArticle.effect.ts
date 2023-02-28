import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EditArticleService} from "../../services/edit-article.service";
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from "../actions/updateArticle.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Injectable()
export class UpdateArticleEffect {

  constructor(private actions$: Actions,
              private editArticleService: EditArticleService,
              private router: Router) {}

  updateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),
    switchMap(({ slug, article }) => {
      return this.editArticleService.updateArticle(slug, article).pipe(
        map((article: ArticleInterface) => {
          return updateArticleSuccessAction({ article })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateArticleFailureAction({ errors: errorResponse.error }))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
      ofType(updateArticleSuccessAction),
      tap(({ article }) => {
        this.router.navigateByUrl(`/articles/${article._id}`)
      })
    ),
    {dispatch: false}
  )
}
