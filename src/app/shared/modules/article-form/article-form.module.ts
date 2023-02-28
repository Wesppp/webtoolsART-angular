import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { EditorModule } from "primeng/editor";
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ProgressBarModule} from "primeng/progressbar";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    ArticleFormComponent
  ],
  exports: [
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    InputTextareaModule,
    ProgressBarModule,
    ButtonModule
  ]
})
export class ArticleFormModule { }
