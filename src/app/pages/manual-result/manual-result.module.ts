import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualResultRoutingModule } from './manual-result-routing.module';
import { ManualResultComponent } from './manual-result.component';


@NgModule({
  declarations: [
    ManualResultComponent
  ],
  imports: [
    CommonModule,
    ManualResultRoutingModule
  ]
})
export class ManualResultModule { }
