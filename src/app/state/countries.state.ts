import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CountriesService } from '../services/countries.service';
import { CountriesViewModel } from '../viewmodels/countries.view.model';
import * as fromCountrieAction from '../actions/countries.action';
import { tap } from 'rxjs/operators';


export const KEY_COUNTRIES = 'countries';

@Injectable()
@State<CountriesViewModel>({
    name: KEY_COUNTRIES,
    defaults: {
        countries: null
    }
})

export class CountriesState {
    constructor(private countriesService: CountriesService){}

    @Selector()
    static getCountries(countries: CountriesViewModel){
        return countries.countries;
    }


    @Action(fromCountrieAction.GetCountriesAction)
    public getCountries(
        { patchState }: StateContext<CountriesViewModel>
    ){
        return this.countriesService.getCountries()
            .pipe(
                tap(resp => {
                     return patchState({
                         countries: resp
                     });
                })
            );
    }

}