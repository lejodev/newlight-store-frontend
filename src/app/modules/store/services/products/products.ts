import { Injectable } from '@angular/core';
import { Http } from '../../../../core/services/http/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpService: Http
  ) { }

  getAllProducts(url: string): Observable<IProduct[]> {
    return this.httpService.get(url)
  }

  getSingleProduct(endpoint: string): Observable<IProduct> {
    return this.httpService.get(endpoint);
  }

}
