import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualResultRoutingModule } from './manual-result-routing.module';
import { ManualResultComponent } from './manual-result.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DialogModule} from "@angular/cdk/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";




@NgModule({
  declarations: [
    ManualResultComponent
  ],
  imports: [
    CommonModule,
    ManualResultRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    DialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ManualResultModule { }
