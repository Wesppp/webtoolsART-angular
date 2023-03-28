import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailArticleComponent } from './components/detail-article/detail-article.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { reducers } from "./store/reducers";
import { ErrorMessageModule } from "../shared/modules/error-message/error-message.module";
import { SanitizeHtmlPipe } from "../shared/pipes/sanitize-html.pipe";
import { ProgressSpinnerModule } from "../shared/modules/progress-spinner/progress-spinner.module";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { DeleteArticleService } from "./services/delete-article.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from 'primeng/api';
import { DeleteArticleEffect } from "./store/effects/deleteArticle.effect";
import {AddToFavoritesModule} from "../shared/modules/add-to-favorites/add-to-favorites.module";

const routes: Routes = [
  {
    path: 'articles/:articleId',
    component: DetailArticleComponent
  }
]

@NgModule({
  declarations: [
    DetailArticleComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([
      GetArticleEffect,
      DeleteArticleEffect
    ]),
    ErrorMessageModule,
    ProgressSpinnerModule,
    ButtonModule,
    RippleModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    AddToFavoritesModule
  ],
  providers: [
    SharedArticleService,
    DeleteArticleService,
    ConfirmationService
  ]
})
export class DetailArticleModule { }
