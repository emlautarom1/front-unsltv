import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './page/about/about.component';
import { HomeComponent } from './page/home/home.component';
import { SearchResultsComponent } from './page/search-results/search-results.component';
import { WatchComponent } from './page/watch/watch.component';

const routes: Routes = [
  // Home redirect
  { path: "", redirectTo: "/home", pathMatch: "full" },

  { path: "home", component: HomeComponent },
  { path: "search/:query", component: SearchResultsComponent },
  { path: "watch/:id", component: WatchComponent },
  { path: "about", component: AboutComponent },

  // 404 redirect
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
