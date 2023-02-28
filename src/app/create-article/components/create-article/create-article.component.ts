import {Component, OnInit} from '@angular/core';
import {
  InputArticleRequestInterface
} from "../../../shared/types/inputArticleRequest.interface";
import {select, Store} from "@ngrx/store";
import {createArticleAction} from "../../store/actiions/createArticle.action";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {backendErrorsSelector, isSubmittingSelector} from "../../store/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  public isSubmitting$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  createArticle(request: InputArticleRequestInterface) {
    this.store.dispatch(createArticleAction({request}))
  }
}
