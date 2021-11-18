import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentSliderComponent } from './content-slider/content-slider.component';
import { ContentHeroComponent } from './content-hero/content-hero.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ContentSliderComponent,
    ContentHeroComponent,
    NavbarComponent
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
