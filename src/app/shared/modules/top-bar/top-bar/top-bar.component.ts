import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { MenuItem } from "primeng/api";
import {select, Store} from "@ngrx/store";
import {logoutAction} from "../../../../auth/store/actions/logout.action";
import {CurrentUserInterface} from "../../../types/currentUser.interface";
import {Subscription} from "rxjs";
import {currentUserSelector} from "../../../../auth/store/selectors";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() isLoggedIn!: boolean
  @Input() isAnonymous!: boolean

  public items!: MenuItem[];

  public currentUser!: CurrentUserInterface | null
  public currentUserSubscription!: Subscription

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners()
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector))
      .subscribe((currentUser: CurrentUserInterface | null) => {
        this.currentUser = currentUser
      })
  }

  ngOnChanges() {
    this.items = [
      {label: 'Add new article', icon: 'pi pi-fw pi-pencil', routerLink: ['/create-article'], visible: this.isLoggedIn},
      {label: 'Articles', icon: 'pi pi-fw pi-book', routerLink: ['/']},
      {label: 'Sign In', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], visible: this.isAnonymous},
      {label: 'Sign Up', icon: 'pi pi-fw pi-box', routerLink: ['/register'], visible: this.isAnonymous},
      {label: 'Settings', icon: 'pi pi-fw pi-user-edit', routerLink: ['/profile-settings'], visible: this.isLoggedIn},
      {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile', this.currentUser?._id], visible: this.isLoggedIn},
      {label: 'Logout', icon: 'pi pi-fw pi-sign-out', visible: this.isLoggedIn, command: () => this.store.dispatch(logoutAction())
      }
    ];
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
}
