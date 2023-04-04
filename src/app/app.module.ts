import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from "./shared/modules/top-bar/top-bar.module";
import { AuthModule } from "./auth/auth.module";
import { FullscreenLoadingComponent } from './shared/components/fullscreen-loading/fullscreen-loading.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthinterceptorService } from "./shared/services/authinterceptor.service";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ArticlesModule } from "./articles/articles.module";
import { ErrorPageModule } from "./error-page/error-page.module";
import { CreateArticleModule } from "./create-article/create-article.module";
import { DetailArticleModule } from "./detail-article/detail-article.module";
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EditArticleModule } from "./edit-article/edit-article.module";
import { ProfileModule } from "./profile/profile.module";
import { ProfileSettingsModule } from "./profile-settings/profile-settings.module";
import { FavoriteArticlesModule } from "./favorite-articles/favorite-articles.module";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { ArticleCategoriesModule } from "./article-categories/article-categories.module";
import {FooterModule} from "./shared/modules/footer/footer.module";

@NgModule({
  declarations: [
    AppComponent,
    FullscreenLoadingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TopBarModule,
        ArticlesModule,
        FavoriteArticlesModule,
        ArticleCategoriesModule,
        ProfileModule,
        CreateArticleModule,
        EditArticleModule,
        ProfileSettingsModule,
        AuthModule,
        DetailArticleModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        ErrorPageModule,
        StoreRouterConnectingModule.forRoot(),
        HttpClientModule,
        FooterModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
