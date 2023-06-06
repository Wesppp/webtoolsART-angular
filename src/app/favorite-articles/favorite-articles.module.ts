import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteArticlesComponent } from './components/favorite-articles/favorite-articles.component';
import {RouterModule, Routes} from "@angular/router";
import {SearchModule} from "../shared/modules/search/search.module";
import {FeedTogglerModule} from "../shared/modules/feed-toggler/feed-toggler.module";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {PopularCategoriesListModule} from "../shared/modules/popular-categories-list/popular-categories-list.module";

const routes: Routes = [
  {
    path: '',
    component: FavoriteArticlesComponent
  }
]

@NgModule({
  declarations: [
    FavoriteArticlesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchModule,
    FeedTogglerModule,
    FeedModule,
    PopularCategoriesListModule
  ]
})
export class FavoriteArticlesModule { }
