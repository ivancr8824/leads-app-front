import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseCountries } from '../models/responseCountries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private URL: string = "https://restcountries.eu/rest/v2"

  constructor(private http: HttpClient){ }

  getCountries(): Observable<ResponseCountries[]> {
    return this.http.get<any[]>(`${this.URL}/region/Americas`)
      .pipe(
        map(this.transformToCountrieList)
      )
  }

  private transformToCountrieList(resp: any[]){
    const countriesList: ResponseCountries[] = resp.map(c => {
      const name = c['alpha3Code'];
      const code = `+${c['callingCodes'][0]}`;
      const flag = c['flag'];

      return { name, code, flag }
    });

    return countriesList;
  }


}
