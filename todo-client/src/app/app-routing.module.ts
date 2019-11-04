import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageViewComponent } from './homepage-view/homepage-view.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';

const routes: Routes = [
  { path: '', component: HomepageViewComponent },
  { path: 'details/:id', component: DetailedViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
