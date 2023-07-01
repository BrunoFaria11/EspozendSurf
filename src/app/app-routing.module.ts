import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './containers/error/error.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { BuildFormComponent } from './containers/build-form/build-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'back', component: BuildFormComponent },
  { path: '**', pathMatch: 'full', component: ErrorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
