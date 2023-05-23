import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getDataObject(params?:any) {
    const url = `${this.apiUrl}character`

    return this.http.get(url, { params })
    .pipe(catchError(err => of({ error: true, typeError: err })));
  }
}
