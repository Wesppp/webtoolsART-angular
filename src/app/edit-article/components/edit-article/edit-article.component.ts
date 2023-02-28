import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {articleSelector, backendErrorsSelector, isLoadingSelector, isSubmittingSelector} from "../../store/selectors";
import {getArticleAction} from "../../store/actions/getArticle.action";
import {InputArticleRequestInterface} from "../../../shared/types/inputArticleRequest.interface";
import {updateArticleAction} from "../../store/actions/updateArticle.action";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  public slug!: string

  public errors$!: Observable<BackendErrorsInterface | null>
  public article$!: Observable<ArticleInterface | null>
  public isLoading$!: Observable<boolean>
  public isSubmitting$!: Observable<boolean>

  constructor(private route: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('articleId')!
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.article$ = this.store.pipe(select(articleSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ articleId: this.slug }))
  }

  updateArticle(inputArticle: InputArticleRequestInterface) {
    this.store.dispatch(updateArticleAction({ slug: this.slug, article: inputArticle }))
  }
}
