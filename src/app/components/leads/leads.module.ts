import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLeadsComponent } from './list-leads/list-leads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ListLeadsComponent,
    SendSmsComponent
  ],
  exports: [
    ListLeadsComponent,
    SendSmsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class LeadsModule { }
