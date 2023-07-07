import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './containers/error/error.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/front-end/home/home.component';
import { HomeBackComponent } from './containers/back-end/home-back/home-back.component';
import { LoginComponent } from './containers/back-end/login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'back-office', component: HomeBackComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
