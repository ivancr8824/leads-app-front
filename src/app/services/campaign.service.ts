import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseCampaign, ResponseSendingEmailCampaign } from '../models/campaign.model';

const URL: string = 'https://leads-backend-consalud.herokuapp.com/api/campaign';
//const URL: string = 'http://localhost:4000/api/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getInformationCampaigns(): Observable<ResponseCampaign>{
    return this.http.get<ResponseCampaign>(`${URL}/listCampaign`);
  }

  sendEmails(campaignSelected: number, emails: string[]): Observable<ResponseSendingEmailCampaign>{
    let emailsBody = {
      emails
    }
    return this.http.post<ResponseSendingEmailCampaign>(`${URL}/sendemail/${campaignSelected}`, emailsBody);
  }
}
