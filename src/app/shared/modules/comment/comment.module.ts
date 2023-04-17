import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {HttpClientModule} from "@angular/common/http";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {CommentFormModule} from "../comment-form/comment-form.module";
import {DialogModule} from "primeng/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {CommentService} from "./services/comment.service";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {ReplyCommentEffect} from "./store/effects/replyComment.effect";
import {GetCommentRepliesEffect} from "./store/effects/getCommentReplies.effect";
import {ProgressSpinnerModule} from "../progress-spinner/progress-spinner.module";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        CommentComponent
    ],
    exports: [
        CommentComponent
    ],
    imports: [
        StoreModule.forFeature('comment', reducers),
        EffectsModule.forFeature([
            ReplyCommentEffect,
            GetCommentRepliesEffect
        ]),
        CommonModule,
        PanelModule,
        ButtonModule,
        RippleModule,
        HttpClientModule,
        OverlayPanelModule,
        CommentFormModule,
        DialogModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
        RouterModule
    ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
