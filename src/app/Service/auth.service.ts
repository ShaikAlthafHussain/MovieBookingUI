import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiBaseUrl;

  loggedIn: boolean = localStorage.getItem("accessToken") != null ? true : false;
  username : string = localStorage.getItem("un")!= null ? "string" : "akhil123";
  constructor(private http: HttpClient) { }
//Authorization
  login(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/api/v1/Authentication/Login`, data);
  }
}
