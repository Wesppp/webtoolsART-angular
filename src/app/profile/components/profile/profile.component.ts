import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {combineLatest, map, Observable, Subscription} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {GetUserProfileResponseInterface} from "../../types/getUserProfileResponse.interface";
import {backendErrorsSelector, isLoadingSelector, userProfileSelector} from "../../store/selectors";
import {currentUserSelector} from "../../../auth/store/selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {getUserProfileAction} from "../../store/actions/getUserProfile.action";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public url: string = '/user/articles/'
  public slug!: string
  public userProfile!: GetUserProfileResponseInterface | null
  public userProfileSubscription!: Subscription
  public routerSubscription!: Subscription

  public isLoading$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>
  public isCurrentUser$!: Observable<boolean>

  constructor(private route: ActivatedRoute,
              private store: Store,
              private router: Router) {
    this.routerSubscription = router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url.includes('/profile')) {
        this.slug = this.route.snapshot.paramMap.get('slug')!
        this.fetchData()
      }
    });
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isCurrentUser$ = combineLatest(
      this.store.pipe(select(userProfileSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([userProfile, currentUser]:
           [GetUserProfileResponseInterface | null, CurrentUserInterface | null]) => {
          if (!userProfile || !currentUser) { return false }
          return currentUser.username === userProfile.user.username
        }
      )
    )
  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }))
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: GetUserProfileResponseInterface | null) => {
        this.userProfile = userProfile
      })
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
    this.routerSubscription.unsubscribe()
  }
}
