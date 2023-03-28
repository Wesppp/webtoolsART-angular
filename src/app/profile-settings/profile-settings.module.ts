import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { RouterModule, Routes } from "@angular/router";
import { CardModule } from "primeng/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputMaskModule } from "primeng/inputmask";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { ProgressSpinnerModule } from "../shared/modules/progress-spinner/progress-spinner.module";
import { CountryPhoneService } from "./services/country-phone.service";
import { RippleModule } from "primeng/ripple";
import { UpdateProfileSettingsService } from "./services/update-profile-settings.service";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { UpdateArticleEffect } from "./store/effects/updateProfileSettings.effect";
import {ProgressBarModule} from "primeng/progressbar";
import {ErrorMessageModule} from "../shared/modules/error-message/error-message.module";
import {FileUploadModule} from "primeng/fileupload";
import {UpdateProfileImageEffect} from "./store/effects/updateProfileImage.effect";
import {DeleteProfileImageEffect} from "./store/effects/deleteProfileImage.effect";

const routes: Routes = [
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent
  }
]

@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        ReactiveFormsModule,
        HttpClientModule,
        InputTextModule,
        InputTextareaModule,
        InputMaskModule,
        DropdownModule,
        FormsModule,
        ButtonModule,
        ProgressSpinnerModule,
        RippleModule,
        StoreModule.forFeature('update-profile-settings', reducers),
        EffectsModule.forFeature([
          UpdateArticleEffect,
          UpdateProfileImageEffect,
          DeleteProfileImageEffect
        ]),
        ProgressBarModule,
        ErrorMessageModule,
        FileUploadModule
    ],
  providers: [
    CountryPhoneService,
    UpdateProfileSettingsService
  ]
})
export class ProfileSettingsModule { }
