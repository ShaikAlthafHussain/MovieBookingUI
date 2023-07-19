import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theatre } from '../Models/theatre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private http: HttpClient) { }

  getTheatre(): Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${environment.apiBaseUrl}/api/v1/Theatre/Get/All`);
  }
  getTheatreById(_id: string): Observable<Theatre> {
    return this.http.get<Theatre>(`${environment.apiBaseUrl}/api/v1/Theatre/Get/${_id}`);
  }
}
