import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedTogglerComponent } from './components/feed-toggler/feed-toggler.component';
import { TabMenuModule } from 'primeng/tabmenu';


@NgModule({
  declarations: [
    FeedTogglerComponent
  ],
    imports: [
      CommonModule,
      TabMenuModule
    ],
  exports: [
    FeedTogglerComponent
  ]
})
export class FeedTogglerModule { }
