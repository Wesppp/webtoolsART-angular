import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from "../actions/addToFavorites.action";
import { AddToFavoritesService } from "../../services/add-to-favorites.service";
import { ArticleInterface } from "../../../../types/article.interface";

@Injectable()
export class AddToFavoriteEffect {

  constructor(private actions$: Actions,
              private addToFavoritesService: AddToFavoritesService) {}

  addToFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(addToFavoritesAction),
    switchMap(({ isFavorite, slug }) => {
      const article$ = isFavorite
        ? this.addToFavoritesService.removeFromFavorites(slug)
        : this.addToFavoritesService.addToFavorites(slug)

      return article$.pipe(
        map((article: ArticleInterface) => {
          console.log(article)
          return addToFavoritesSuccessAction({ article })
        }),
        catchError(() => {
          return of(addToFavoritesFailureAction())
        })
      )
    })
  ))
}
