import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import { addToFavoritesAction } from "../../store/actions/addToFavorites.action";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../../store/selectors";

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {
  @Input() isFavorite!: boolean
  @Input() favoritesCount!: number
  @Input() articleSlug!: string

  public isSubmitting$!: Observable<boolean>

  constructor(private store: Store) {
  }

  handleLike(): void {
    this.store.dispatch(addToFavoritesAction({ isFavorite: this.isFavorite, slug: this.articleSlug }))
    if (this.isFavorite) {
      this.favoritesCount -= 1
    } else {
      this.favoritesCount += 1
    }

    this.isFavorite = !this.isFavorite
  }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }
}
