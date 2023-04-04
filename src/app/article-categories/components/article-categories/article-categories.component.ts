import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {articlesCountSelector} from "../../../shared/modules/feed/store/selectors";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-categories',
  templateUrl: './article-categories.component.html',
  styleUrls: ['./article-categories.component.scss']
})
export class ArticleCategoriesComponent implements OnInit, OnDestroy{
  public url!: string
  public category!: string

  public articlesCount$!: Observable<number | null>
  public subscription!: Subscription

  constructor(private store: Store,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeListeners()
    this.articlesCount$ = this.store.pipe(select(articlesCountSelector))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  initializeListeners(): void {
    this.subscription = this.route.params
      .subscribe(params => {
        this.category = params['slug']
        this.url = `/articles/categories/${params['slug']}`
      })
  }
}
