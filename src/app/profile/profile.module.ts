import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from "@angular/router";
import { UserProfileService } from "./services/user-profile.service";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule} from "@ngrx/effects";
import { GetUserProfileEffect } from "./store/effects/getUserProfile.effect";
import {ErrorMessageModule} from "../shared/modules/error-message/error-message.module";
import {ProgressSpinnerModule} from "../shared/modules/progress-spinner/progress-spinner.module";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {SearchModule} from "../shared/modules/search/search.module";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
]

@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        StoreModule.forFeature('user-profile', reducers),
        EffectsModule.forFeature([
            GetUserProfileEffect
        ]),
        ErrorMessageModule,
        ProgressSpinnerModule,
        FeedModule,
        SearchModule
    ],
  providers: [
    UserProfileService
  ]
})
export class ProfileModule { }
