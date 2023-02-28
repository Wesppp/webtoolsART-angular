import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import {isAnonymousSelector, isLoggedInSelector} from "./auth/store/selectors";
import { getCurrentUserAction } from "./auth/store/actions/getCurrentUser.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webtoolsART';
  public isLoading: boolean = false

  public isLoggedIn$!: Observable<boolean>
  public isAnonymous$!: Observable<boolean>

  constructor(private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())

    this.initializeValues()

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
  }
}
