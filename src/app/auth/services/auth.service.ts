import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { map, Observable } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { environment } from "../../../environments/environment";
import { AuthResponseInterface } from "../types/authResponse.interface";
import {LoginRequestInterface} from "../types/loginRequest.interface";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/register'

    return this.http.post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + '/auth/login'

    return this.http.post<AuthResponseInterface>(url, data)
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'

    return this.http.get<CurrentUserInterface>(url)
  }
}
