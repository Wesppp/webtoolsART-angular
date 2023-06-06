import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {categoriesSelector, isLoadingSelector} from "../../store/selectors";
import {getPopularCategoriesAction} from "../../store/actions/getPopularCategories.action";

@Component({
  selector: 'app-popular-categories-list',
  templateUrl: './popular-categories-list.component.html',
  styleUrls: ['./popular-categories-list.component.scss']
})
export class PopularCategoriesListComponent implements OnInit {
  public popularCategories$!: Observable<string[] | null>
  public isLoading$!: Observable<boolean>

  constructor(private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchPopularCategories()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.popularCategories$ = this.store.pipe(select(categoriesSelector))
  }

  handleTagClick(category: string): void {
    this.router.navigate(['/article-categories', category])
  }

  fetchPopularCategories(): void {
    this.store.dispatch(getPopularCategoriesAction())
  }

  public trackByCategory(index: number, category: string): string {
    return category;
  }
}
