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

  get(endpoint: string, headers?: HttpHeaders, params?: HttpParams) {
    const url = this.api(endpoint)
    console.log(url);
    
    return this.http.get(url, { headers, params })
  }
}
