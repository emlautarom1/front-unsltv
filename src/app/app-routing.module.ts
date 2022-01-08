import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AboutComponent } from './page/about/about.component';
import { HomeComponent } from './page/home/home.component';
import { WatchComponent } from './page/watch/watch.component';
import { SearchComponent } from './page/search/search.component';

const routes: Routes = [
  // Home redirect
  { path: "", redirectTo: "/home", pathMatch: "full" },

  { path: "home", component: HomeComponent },
  { path: "search/:query", component: SearchComponent },
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
