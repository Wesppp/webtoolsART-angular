import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { combineLatest, map, Observable, Subscription } from "rxjs";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { articleSelector, backendErrorsSelector, isLoadingSelector } from "../../store/selectors";
import { ActivatedRoute } from "@angular/router";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { currentUserSelector } from "../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { ConfirmationService } from "primeng/api";
import { deleteArticleAction } from "../../store/actions/deleteArticle.action";
import { getCurrentUserAction } from "../../../auth/store/actions/getCurrentUser.action";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit, OnDestroy {
  public slug!: string

  public article!: ArticleInterface | null
  public articleSubscription!: Subscription
  public isLoading$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>
  public isAuthor$!: Observable<boolean>
  public isFavorite$!: Observable<boolean>

  constructor(private store: Store,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('articleId')!
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]:
           [ArticleInterface | null, CurrentUserInterface | null]) => {
          if (!article || !currentUser) { return false }
          return currentUser.username === article.author.username
        }
      )
    )
    this.isFavorite$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]:
           [ArticleInterface | null, CurrentUserInterface | null]) => {
          if (!article || !currentUser || !currentUser.favoritesArticles) { return false }
          return currentUser.favoritesArticles.includes(article._id)
        }
      )
    )
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article
      })
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ articleId: this.slug }))
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
    this.store.dispatch(getCurrentUserAction())
  }

  deleteArticle() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this article?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(deleteArticleAction({ articleId: this.slug }))
      }
    });
  }
}
