import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CommentFormComponent
  ],
  exports: [
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    InputTextareaModule,
    ButtonModule,
    ReactiveFormsModule
  ]
})
export class CommentFormModule { }
