import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Http {

  constructor(
    private http: HttpClient
  ) { }

  api(endpoint: string) {
    let APIURL = import.meta.env['NG_APP_APIURL'];
    console.log(APIURL);

    const url = `${APIURL}${endpoint}`
    return url
  }

  get<T>(endpoint: string, headers?: HttpHeaders, params?: HttpParams) {
    const url = this.api(endpoint)
    console.log(url);

    return this.http.get<T>(url, { headers, params })
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders, params?: HttpParams) {
    const url = this.api(endpoint)
    return this.http.post<T>(url, body, { headers, params })
  }


}
