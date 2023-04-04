import { PopularCategoriesService } from "../../services/popular-categories.service"
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {
  getPopularCategoriesAction,
  getPopularCategoriesFailureAction,
  getPopularCategoriesSuccessAction
} from "../actions/getPopularCategories.action";

@Injectable()
export class GetPopularCategoriesEffect {

  constructor(private actions$: Actions,
              private popularCategoriesService: PopularCategoriesService) {}

  getPopularCategories$ = createEffect(() => this.actions$.pipe(
    ofType(getPopularCategoriesAction),
    switchMap(() => {
      return this.popularCategoriesService.getPopularCategories().pipe(
        map((categories: string[]) => {
          return getPopularCategoriesSuccessAction({ categories })
        }),
        catchError(() => {
          return of(getPopularCategoriesFailureAction())
        })
      )
    })
  ))
}
