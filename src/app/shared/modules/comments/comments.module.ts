import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './components/comments/comments.component';
import {CommentsService} from "./services/comments.service";
import {HttpClientModule} from "@angular/common/http";
import {CommentModule} from "../comment/comment.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {GetCommentsEffect} from "./store/effects/getComments.effect";
import {ErrorMessageModule} from "../error-message/error-message.module";
import {ProgressSpinnerModule} from "../progress-spinner/progress-spinner.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {AddCommentEffect} from "./store/effects/addComment.effect";
import {BadgeModule} from "primeng/badge";
import {DeleteCommentEffect} from "./store/effects/deleteComment.effect";
import {UpdateCommentEffect} from "./store/effects/updateComment.effect";
import {CommentFormModule} from "../comment-form/comment-form.module";


@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommentModule,
    StoreModule.forFeature('comments', reducers),
    EffectsModule.forFeature([
      GetCommentsEffect,
      AddCommentEffect,
      DeleteCommentEffect,
      UpdateCommentEffect
    ]),
    ErrorMessageModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    ButtonModule,
    BadgeModule,
    CommentFormModule,
  ],
  exports: [
    CommentsComponent
  ],
  providers: [
    CommentsService
  ]
})
export class CommentsModule {
}

// перенёс сервис, изменил state и initialState
