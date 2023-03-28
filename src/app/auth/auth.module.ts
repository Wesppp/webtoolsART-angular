import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from "@angular/router";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from "primeng/divider";
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "./store/effects/register.effect";
import { ErrorMessageModule } from "../shared/modules/error-message/error-message.module";
import { LoginEffect } from "./store/effects/login.effect";
import { LogoutEffect } from "./store/effects/logout.effect";
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect";
import { ProgressBarModule } from "primeng/progressbar";
import { AuthGuard } from "./auth.guard";
import {ClearAuthFormService} from "./services/clear-auth-form.service";
import {AuthService} from "./services/auth.service";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([
            RegisterEffect,
            LoginEffect,
            LogoutEffect,
            GetCurrentUserEffect
        ]),
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        InputTextModule,
        PasswordModule,
        DividerModule,
        ReactiveFormsModule,
        ButtonModule,
        RxReactiveFormsModule,
        HttpClientModule,
        ErrorMessageModule,
        ProgressBarModule
    ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthGuard,
    ClearAuthFormService,
    AuthService
  ]
})
export class AuthModule { }
