import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ServicesComponent } from './components/services/services.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { MapComponent } from './components/map/map.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { FilterBannerPipe } from 'src/core/pipe/banners';
import { ErrorComponent } from './containers/error/error.component';
import { HomeComponent } from './containers/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BuildFormComponent } from './containers/build-form/build-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AboutComponent,
    BenefitsComponent,
    ServicesComponent,
    PricingComponent,
    EquipmentComponent,
    MapComponent,
    GalleryComponent,
    ContactComponent,
    FilterBannerPipe,
    ErrorComponent,
    HomeComponent,
    BuildFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CarouselModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
