import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { FeedService } from "./services/feed.service";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { GetFeedEffect } from "./store/effects/getFeed.effect";
import { ErrorMessageModule } from "../error-message/error-message.module";
import { ArticleModule } from "../article/article.module";
import { ProgressSpinnerModule } from "../progress-spinner/progress-spinner.module";
import { SearchPipe } from "../../pipes/search.pipe";
import {PaginatorModule} from "../paginator/paginator.module";


@NgModule({
  declarations: [
    FeedComponent,
    SearchPipe
  ],
  exports: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('feed', reducers),
    EffectsModule.forFeature([
      GetFeedEffect
    ]),
    ErrorMessageModule,
    ArticleModule,
    ProgressSpinnerModule,
    PaginatorModule,
  ],
  providers: [
    FeedService
  ]
})
export class FeedModule {
}
