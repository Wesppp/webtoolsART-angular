import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsLoggedInGuard} from "./shared/guards/isLoggedIn.guard";
import {ArticlesComponent} from "./articles/components/articles/articles.component";

const routes: Routes = [
  { path: '', component: ArticlesComponent },
  {
    path: '',
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: 'profile/:slug',
        loadChildren: () => import('./profile/profile.module').then(x => x.ProfileModule),
      },
      {
        path: 'profile-settings',
        loadChildren: () => import('./profile-settings/profile-settings.module').then(x => x.ProfileSettingsModule),
      },
      {
        path: 'create-article',
        loadChildren: () => import('./create-article/create-article.module').then(x => x.CreateArticleModule),
      },
      {
        path: 'articles/:articleId/edit',
        loadChildren: () => import('./edit-article/edit-article.module').then(x => x.EditArticleModule),
      }
    ],
  },
  {
    path: 'article-categories/:slug',
    loadChildren: () => import('./article-categories/article-categories.module').then(x => x.ArticleCategoriesModule)
  },
  {
    path: 'favorite-articles',
    loadChildren: () => import('./favorite-articles/favorite-articles.module').then(x => x.FavoriteArticlesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
