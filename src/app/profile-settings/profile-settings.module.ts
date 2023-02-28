import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { RouterModule, Routes } from "@angular/router";
import { CardModule } from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {ProgressSpinnerModule} from "../shared/modules/progress-spinner/progress-spinner.module";

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
        ProgressSpinnerModule
    ]
})
export class ProfileSettingsModule { }
