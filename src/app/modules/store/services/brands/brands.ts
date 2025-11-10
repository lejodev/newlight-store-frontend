import { Injectable } from '@angular/core';
import { Http } from '../../../../core/services/http/http';
import { Observable } from 'rxjs';
import { IBrand } from '../../../../shared/interfaces/brand.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {

  constructor(
    private httpService: Http
  ) { }

  getAllBrands(url: string): Observable<IBrand[]> {
    return this.httpService.get(url)
  }

}
