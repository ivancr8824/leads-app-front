import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { Lead } from '../models/lead.model';

const URL: string = 'https://leads-backend-consalud.herokuapp.com/api/leads';
//const URL: string = 'http://localhost:4000/api/leads';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient) { }

  getInformationLeads(page: number = 1, limit: number = 5): Observable<Response>{
      return this.http.get<Response>(`${URL}/${page}/${limit}`);
  }

  searchInformationLeads(termino: string, page: number = 1, limit: number = 5): Observable<Response>{
    return this.http.get<Response>(`${URL}/search/${page}/${limit}?search=${termino.trim().toLowerCase()}`);
  }

  getAllInformationLeads(): Observable<Response>{
    return this.http.get<Response>(`${URL}/all`);
}

  saveLead(lead: Lead): Observable<Response>{
    const body: any = {
      name: lead.Name,
      email: lead.Email,
      phone: lead.Phone,
      countrie: lead.Countrie
    };

    return this.http.post<Response>(`${URL}/new`, body);
  }

  updateLead(lead: Lead): Observable<Response>{
    const body: any = {
      name: lead.Name,
      email: lead.Email,
      phone: lead.Phone,
      countrie: lead.Countrie,
      statusLeads: lead.StatusLead
    };
    return this.http.put<Response>(`${URL}/${lead.Id}`, body);
  }

  deleteLead(id: number): Observable<Response>{
    return this.http.delete<Response>(`${URL}/${id}`);
  }

  sendEmail(email: string): Observable<Response>{
    const body = {
      emailLead: email
    }

    return this.http.post<Response>(`${URL}/sendemail`, body);
  }
}
