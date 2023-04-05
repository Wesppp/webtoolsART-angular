import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import { BackendErrorsInterface } from "../../../../types/backendErrors.interface";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import { select, Store } from "@ngrx/store";
import {
  articlesCountSelector,
  backendErrorsSelector,
  feedDataSelector,
  isFeedDataEmptySelector,
  isLoadingSelector
} from "../../store/selectors";
import { getFeedAction } from "../../store/actions/getFeed.action";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {currentUserSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnChanges, OnInit {
  @Input() url!: string
  @Input() search: string = ''

  public errors$!: Observable<BackendErrorsInterface | null>
  public isLoading$!: Observable<boolean>
  public feedData$!: Observable<GetFeedResponseInterface | null>
  public currentUser$!: Observable<CurrentUserInterface | null>
  public isFeedDataEmpty$!: Observable<boolean>
  public articlesCount$!: Observable<number | null>

  public pageSize: number = 8;

  constructor(private store: Store) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadPage(0);
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.feedData$ = this.store.pipe(select(feedDataSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.isFeedDataEmpty$ = this.store.pipe(select(isFeedDataEmptySelector))
    this.articlesCount$ = this.store.pipe(select(articlesCountSelector))
  }

  loadPage(pageNumber: number) {
    const url = `${this.url}?pageNumber=${pageNumber}&pageSize=${this.pageSize}`;

    this.store.dispatch(getFeedAction({ url }))
  }
}
