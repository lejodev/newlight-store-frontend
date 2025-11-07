import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store';
import { IProduct } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-store',
  imports: [],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {

  products!: IProduct[];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.getAllProducts('products').subscribe(res => {
      console.log(res);
      
    })
  }

}
