import { ResponseCountries } from '../models/responseCountries';

interface ICountries {
    countries: ResponseCountries[]
}

export class CountriesViewModel implements ICountries {
    public countries: ResponseCountries[]

    constructor(obj: ICountries){
        this.countries = (obj && obj.countries) || null;
    }
}