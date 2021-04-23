import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { LeadsModule } from './leads/leads.module';
import { routing } from '../routes/routes.routing';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  exports:[
    MainPageComponent
  ], 
  imports: [
    CommonModule,
    routing,
    LeadsModule
  ]
})
export class MainPageModule { }
