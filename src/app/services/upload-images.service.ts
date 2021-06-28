import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_THUMBSNAP } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseThumbSnap } from '../models/responseThumbSnap';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(private http: HttpClient){ }

  uploadImage(formData: FormData): Observable<ResponseThumbSnap> {
    return this.http.post<ResponseThumbSnap>(`${URL_THUMBSNAP}/upload`, formData);
  }
}
