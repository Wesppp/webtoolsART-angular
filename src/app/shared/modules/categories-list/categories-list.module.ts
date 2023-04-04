import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import {TagModule} from "primeng/tag";



@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  exports: [
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    TagModule
  ]
})
export class CategoriesListModule { }
