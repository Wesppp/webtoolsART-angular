import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { articlesCountSelector } from "../../../shared/modules/feed/store/selectors";

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.scss']
})
export class FavoriteArticlesComponent implements OnInit {
  public url: string = '/articles/favorites'

  public articlesCount$!: Observable<number | null>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.articlesCount$ = this.store.pipe(select(articlesCountSelector))
  }
}
