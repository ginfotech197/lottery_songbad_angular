import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, { path: 'manualResult', loadChildren: () => import('./pages/manual-result/manual-result.module').then(m => m.ManualResultModule) },
  { path: 'manualResult', loadChildren: () => import('./pages/manual-result/manual-result.module').then(m => m.ManualResultModule) }, { path: 'manualResult', loadChildren: () => import('./pages/manual-result/manual-result.module').then(m => m.ManualResultModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
