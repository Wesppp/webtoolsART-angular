import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { articlesCountSelector } from "../../../shared/modules/feed/store/selectors";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public url: string = '/articles'

  public articlesCount$!: Observable<number | null>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.articlesCount$ = this.store.pipe(select(articlesCountSelector))
  }
}
