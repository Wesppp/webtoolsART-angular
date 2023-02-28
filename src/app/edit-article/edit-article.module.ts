import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { RouterModule, Routes } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/article-form/article-form.module";
import { EditArticleService } from "./services/edit-article.service";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { ErrorMessageModule } from "../shared/modules/error-message/error-message.module";
import { ProgressSpinnerModule } from "../shared/modules/progress-spinner/progress-spinner.module";
import { UpdateArticleEffect } from "./store/effects/updateArticle.effect";

const routes: Routes = [
  {
    path: 'articles/:articleId/edit',
    component: EditArticleComponent
  }
]

@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    HttpClientModule,
    StoreModule.forFeature('edit-article', reducers),
    EffectsModule.forFeature([
      GetArticleEffect,
      UpdateArticleEffect
    ]),
    ErrorMessageModule,
    ProgressSpinnerModule
  ],
  providers: [
    EditArticleService
  ]
})
export class EditArticleModule { }
