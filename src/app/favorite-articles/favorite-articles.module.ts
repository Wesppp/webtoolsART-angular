import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteArticlesComponent } from './components/favorite-articles/favorite-articles.component';
import {RouterModule, Routes} from "@angular/router";
import {SearchModule} from "../shared/modules/search/search.module";
import {FeedTogglerModule} from "../shared/modules/feed-toggler/feed-toggler.module";
import {FeedModule} from "../shared/modules/feed/feed.module";

const routes: Routes = [
  {
    path: 'favorite-articles',
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
    FeedModule
  ]
})
export class FavoriteArticlesModule { }
