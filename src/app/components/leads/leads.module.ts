import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLeadsComponent } from './list-leads/list-leads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SendEmailsComponent } from './send-emails/send-emails.component';

@NgModule({
  declarations: [
    ListLeadsComponent,
    SendSmsComponent,
    SendEmailsComponent
  ],
  exports: [
    ListLeadsComponent,
    SendSmsComponent,
    SendEmailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class LeadsModule { }
