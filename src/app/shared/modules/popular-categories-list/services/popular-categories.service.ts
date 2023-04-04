import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class PopularCategoriesService {

  constructor(private http: HttpClient) { }

  getPopularCategories(): Observable<string[]> {
    const url = environment.apiUrl + '/popular-categories'

    return this.http.get<string[]>(url)
  }
}
