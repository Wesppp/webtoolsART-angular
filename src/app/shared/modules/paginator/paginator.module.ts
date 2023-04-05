import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaginatorModule as PrimengPaginatorModule } from "primeng/paginator";



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    PrimengPaginatorModule
  ]
})
export class PaginatorModule { }
