import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerModule as CustomProgressSpinnerModule } from "primeng/progressspinner";



@NgModule({
  declarations: [
    ProgressSpinnerComponent
  ],
  exports: [
    ProgressSpinnerComponent
  ],
  imports: [
    CommonModule,
    CustomProgressSpinnerModule,
  ]
})
export class ProgressSpinnerModule { }
