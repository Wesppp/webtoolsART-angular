import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GetUserProfileResponseInterface } from "../types/getUserProfileResponse.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(slug: string): Observable<GetUserProfileResponseInterface> {
    const url = environment.apiUrl + `/user/${slug}`

    return this.http.get<GetUserProfileResponseInterface>(url)
  }
}
