import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './containers/error/error.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/front-end/home/home.component';
import { HomeBackComponent } from './containers/back-end/home-back/home-back.component';
import { LoginComponent } from './containers/back-end/login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { DashboardComponent } from './containers/back-end/dashboard/dashboard.component';
import { CalendarBackComponent } from './containers/back-end/calendar/calendar.component';
import { ReservationsComponent } from './containers/back-end/reservations/reservations.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'back-office',
    component: HomeBackComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'calendar',
        component: CalendarBackComponent,
      },
      {
        path: 'requests',
        component: ReservationsComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
