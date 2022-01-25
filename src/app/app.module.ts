import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { VideoCardComponent } from './component/video-card/video-card.component';

import { ContentSliderComponent } from './page/home/content-slider/content-slider.component';
import { ContentHeroComponent } from './page/home/content-hero/content-hero.component';
import { AboutComponent } from './page/about/about.component';
import { HomeComponent } from './page/home/home.component';
import { WatchComponent } from './page/watch/watch.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { SearchComponent } from './page/search/search.component';
import { LocalDatePipe } from './pipe/local-date.pipe';
import { YoutubeCategoryPipe } from './pipe/youtube-category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContentSliderComponent,
    ContentHeroComponent,
    AboutComponent,
    SearchComponent,
    VideoCardComponent,
    WatchComponent,
    NotFoundComponent,
    LocalDatePipe,
    YoutubeCategoryPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SwiperModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
