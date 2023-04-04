import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenubarModule } from 'primeng/menubar';
import {PopularCategoriesListModule} from "../popular-categories-list/popular-categories-list.module";


@NgModule({
    declarations: [
      TopBarComponent
    ],
    exports: [
      TopBarComponent
    ],
    imports: [
        CommonModule,
        MenubarModule,
        PopularCategoriesListModule
    ]
})
export class TopBarModule { }
