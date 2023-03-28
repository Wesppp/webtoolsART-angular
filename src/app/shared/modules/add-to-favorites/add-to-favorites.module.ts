import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { AddToFavoritesService } from "./services/add-to-favorites.service";
import { AddToFavoriteEffect } from "./store/effects/addToFavorites.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";


@NgModule({
  declarations: [
    AddToFavoritesComponent
  ],
  exports: [
    AddToFavoritesComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    EffectsModule.forFeature([
      AddToFavoriteEffect
    ]),
    StoreModule.forFeature('add-to-favorites', reducers)
  ],
  providers: [
    AddToFavoritesService
  ]
})
export class AddToFavoritesModule { }
