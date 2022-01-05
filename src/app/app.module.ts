import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentSliderComponent } from './page/home/content-slider/content-slider.component';
import { ContentHeroComponent } from './page/home/content-hero/content-hero.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './page/about/about.component';
import { HomeComponent } from './page/home/home.component';
import { SearchResultsComponent } from './page/search-results/search-results.component';
import { SingleResultComponent } from './page/search-results/single-result/single-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContentSliderComponent,
    ContentHeroComponent,
    AboutComponent,
    SearchResultsComponent,
    SingleResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
