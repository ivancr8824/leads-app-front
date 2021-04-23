import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from '../routes/routes.routing';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchComponent,
    ModalComponent
  ],
  exports:[
    NavbarComponent,
    SearchComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
