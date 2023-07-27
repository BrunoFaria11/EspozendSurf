import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/front-end/header/header.component';
import { BannerComponent } from './components/front-end/banner/banner.component';
import { AboutComponent } from './components/front-end/about/about.component';
import { BenefitsComponent } from './components/front-end/benefits/benefits.component';
import { ServicesComponent } from './components/front-end/services/services.component';
import { PricingComponent } from './components/front-end/pricing/pricing.component';
import { EquipmentComponent } from './components/front-end/equipment/equipment.component';
import { MapComponent } from './components/front-end/map/map.component';
import { GalleryComponent } from './components/front-end/gallery/gallery.component';
import { ContactComponent } from './components/front-end/contact/contact.component';
import { FilterBannerPipe } from 'src/core/pipe/banners';
import { ErrorComponent } from './containers/error/error.component';
import { HomeComponent } from './containers/front-end/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeBackComponent } from './containers/back-end/home-back/home-back.component';
import { CalendarComponent } from './components/back-end/calendar/calendar.component';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { AppService } from 'src/core/services/app-service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MailBoxComponent } from './components/back-end/mail-box/mail-box.component';
import { DailyCalendarComponent } from './components/back-end/daily-calendar/daily-calendar.component';
import { DashboardComponent } from './containers/back-end/dashboard/dashboard.component';
import { CalendarBackComponent } from './containers/back-end/calendar/calendar.component';
import { EmailService } from 'src/core/services/email-service';
import { LoginComponent } from './containers/back-end/login/login.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { auth } from '../environments/auth';
import { ReservationsComponent } from './containers/back-end/reservations/reservations.component';
import { ReservationHeaderComponent } from './components/back-end/reservation-header/reservation-header.component';
import { ResponseComponent } from './components/back-end/response/response.component';
import { UpdateReservationComponent } from './components/back-end/update-reservation/update-reservation.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
    HomeBackComponent,
    CalendarComponent,
    MailBoxComponent,
    DailyCalendarComponent,
    DashboardComponent,
    CalendarBackComponent,
    LoginComponent,
    ReservationsComponent,
    ReservationHeaderComponent,
    ResponseComponent,
    UpdateReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AuthModule.forRoot({
      ...auth.auth,
      httpInterceptor: {
        ...auth.httpInterceptor,
      },
      useRefreshTokens: true
    }),
    LazyLoadImageModule
  ],
  providers: [
    AppService,
    EmailService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthHttpInterceptor,
    //   multi: true,
    // },
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MOMENT, useValue: MOMENT },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule {}
