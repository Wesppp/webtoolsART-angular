import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularCategoriesListComponent } from './components/popular-categories-list/popular-categories-list.component';
import { PopularCategoriesService } from "./services/popular-categories.service";
import { TagModule } from "primeng/tag";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { GetPopularCategoriesEffect } from "./store/effects/getPopularCategories.effect";
import { ProgressSpinnerModule } from "../progress-spinner/progress-spinner.module";
import { SkeletonModule } from "primeng/skeleton";

@NgModule({
  declarations: [
    PopularCategoriesListComponent
  ],
  imports: [
    CommonModule,
    TagModule,
    HttpClientModule,
    StoreModule.forFeature('popular-categories', reducers),
    EffectsModule.forFeature([
      GetPopularCategoriesEffect
    ]),
    ProgressSpinnerModule,
    SkeletonModule
  ],
  exports: [
    PopularCategoriesListComponent
  ],
  providers: [
    PopularCategoriesService
  ]
})
export class PopularCategoriesListModule { }
