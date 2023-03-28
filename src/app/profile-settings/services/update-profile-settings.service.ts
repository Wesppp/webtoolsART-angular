import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {environment} from "../../../environments/environment";
import {UpdateProfileSettingsRequestInterface} from "../types/updateProfileSettingsRequest.interface";

@Injectable()
export class UpdateProfileSettingsService {

  constructor(private http: HttpClient) { }

  updateProfileSettings(data: UpdateProfileSettingsRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'

    return this.http.put<CurrentUserInterface>(url, data)
  }

  updateProfileImage(fb: FormData): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user/avatar'

    return this.http.post<CurrentUserInterface>(url, fb)
  }

  deleteProfileImage(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + `/user/avatar`

    return this.http.delete<CurrentUserInterface>(url)
  }
}
