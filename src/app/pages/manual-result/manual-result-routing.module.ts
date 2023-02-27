import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualResultComponent } from './manual-result.component';

const routes: Routes = [{ path: '', component: ManualResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualResultRoutingModule { }
