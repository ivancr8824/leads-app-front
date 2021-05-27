import { RouterModule, Routes } from '@angular/router';
import { ListLeadsComponent } from '../components/leads/list-leads/list-leads.component';
import { SendEmailsComponent } from '../components/leads/send-emails/send-emails.component';
import { SendSmsComponent } from '../components/leads/send-sms/send-sms.component';

const appRoutes: Routes = [
    { path: 'leads', component: ListLeadsComponent, pathMatch: 'full'},
    { path: 'sms', component: SendSmsComponent, pathMatch: 'full'},
    { path: 'campaignemail', component: SendEmailsComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'leads'},
];

export const routing = RouterModule.forRoot(appRoutes);