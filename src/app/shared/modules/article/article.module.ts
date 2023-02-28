import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from "primeng/menu";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from 'primeng/avatar';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    PanelModule,
    MenuModule,
    ButtonModule,
    AvatarModule
  ],
  exports: [
    ArticleComponent
  ],
  providers: [
    MessageService
  ]
})
export class ArticleModule { }
