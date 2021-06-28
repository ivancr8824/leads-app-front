import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLeadsComponent } from './list-leads/list-leads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SendEmailsComponent } from './send-emails/send-emails.component';
import { PublishContentBlogComponent } from './others/publish-content-blog/publish-content-blog.component';
import { RichTextEditorAllModule, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AdminContentBlogComponent } from './others/admin-content-blog/admin-content-blog.component';

@NgModule({
  declarations: [
    ListLeadsComponent,
    SendSmsComponent,
    SendEmailsComponent,
    AdminContentBlogComponent,
    PublishContentBlogComponent
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
    ReactiveFormsModule,
    NgbModule,
    RichTextEditorModule,
    RichTextEditorAllModule
  ]
})
export class LeadsModule { }
