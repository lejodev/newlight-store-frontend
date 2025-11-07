import { Injectable } from '@angular/core';
import { Http } from '../../../core/services/http/http';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(
    private httpService: Http
  ) { }

  getAllProducts(url: string) {
    return this.httpService.get(url)
  }

}
