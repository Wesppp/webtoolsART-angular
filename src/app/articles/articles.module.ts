import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './components/articles/articles.component';
import { RouterModule, Routes } from "@angular/router";
import { ArticleModule } from "../shared/modules/article/article.module";
import { SearchModule } from "../shared/modules/search/search.module";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { TabViewModule } from "primeng/tabview";
import { TabMenuModule } from "primeng/tabmenu";
import { FeedTogglerModule } from "../shared/modules/feed-toggler/feed-toggler.module";
import {PopularCategoriesListModule} from "../shared/modules/popular-categories-list/popular-categories-list.module";

const routes: Routes = [
  { path: '', component: ArticlesComponent }
];

@NgModule({
    declarations: [
        ArticlesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ArticleModule,
        SearchModule,
        FeedModule,
        TabViewModule,
        TabMenuModule,
        FeedTogglerModule,
        PopularCategoriesListModule
    ],
    exports: [
        ArticlesComponent
    ]
})
export class ArticlesModule { }
