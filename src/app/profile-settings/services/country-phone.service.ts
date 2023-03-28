import { Injectable } from '@angular/core';
import {CountriesPhoneMaskInterface} from "../types/countriesPhoneMask.interface";
const countries: CountriesPhoneMaskInterface[] = require('countries-phone-masks')

@Injectable()
export class CountryPhoneService {
  getCountryInfo(country: string): CountriesPhoneMaskInterface | null {
    return countries.find(({ name }) => name === country) || null
  }

  getCountryPhoneMask(country: string): string {
    const countryInfo = this.getCountryInfo(country)
    const re = new RegExp('#', 'g');

    if(!countryInfo) { return '' }

    if(Array.isArray(countryInfo.mask)) { return countryInfo.mask[0].replace(re, '9') }

    return countryInfo.mask.replace(re, '9')
  }

  getFullPhoneNumber(phone: string, country: string): string {
    if(!phone) { return  '' }
    const countryInfo = this.getCountryInfo(country)

    if(phone.includes(countryInfo?.code!)) { return phone }

    return countryInfo?.code + phone
  }
}
