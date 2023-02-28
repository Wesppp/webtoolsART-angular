import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { BackendErrorsInterface } from "../../../../types/backendErrors.interface";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import { select, Store } from "@ngrx/store";
import { backendErrorsSelector, feedDataSelector, isLoadingSelector } from "../../store/selectors";
import { getFeedAction } from "../../store/actions/getFeed.action";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {currentUserSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input() url!: string
  @Input() search: string = ''

  public errors$!: Observable<BackendErrorsInterface | null>
  public isLoading$!: Observable<boolean>
  public feedData$!: Observable<GetFeedResponseInterface | null>
  public currentUser$!: Observable<CurrentUserInterface | null>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  initializeValues(): void {
    this.feedData$ = this.store.pipe(select(feedDataSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.url }))
  }
}
