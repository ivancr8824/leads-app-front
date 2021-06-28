import { RouterModule, Routes } from '@angular/router';
import { ListLeadsComponent } from '../components/leads/list-leads/list-leads.component';
import { SendEmailsComponent } from '../components/leads/send-emails/send-emails.component';
import { SendSmsComponent } from '../components/leads/send-sms/send-sms.component';
import { PublishContentBlogComponent } from '../components/leads/others/publish-content-blog/publish-content-blog.component';
import { AdminContentBlogComponent } from '../components/leads/others/admin-content-blog/admin-content-blog.component';

const appRoutes: Routes = [
    { path: 'leads', component: ListLeadsComponent, pathMatch: 'full'},
    { path: 'sms', component: SendSmsComponent, pathMatch: 'full'},
    { path: 'campaignemail', component: SendEmailsComponent, pathMatch: 'full' },
    { path: 'others/admin-content-blog', component: AdminContentBlogComponent, pathMatch: 'full'},
    { path: 'others/publish-blog/:id', component: PublishContentBlogComponent, pathMatch: 'full'},
    { path: '**', redirectTo: 'leads'},
];

export const routing = RouterModule.forRoot(appRoutes);