import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { RouterModule, Routes } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/article-form/article-form.module";
import { CreateArticleService } from "./services/create-article.service";
import { HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {CreateArticleEffect} from "./store/effects/createArticle.effect";
import {ErrorMessageModule} from "../shared/modules/error-message/error-message.module";

const routes: Routes = [
  {
    path: 'create-article',
    component: CreateArticleComponent
  }
]

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    HttpClientModule,
    StoreModule.forFeature('createArticle', reducers),
    EffectsModule.forFeature([
      CreateArticleEffect
    ]),
    ErrorMessageModule
  ],
  providers: [
    CreateArticleService
  ]
})
export class CreateArticleModule { }
