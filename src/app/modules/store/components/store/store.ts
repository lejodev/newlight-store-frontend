import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products/products';
import { CartService } from '../../../shopping_cart/services/cart-service';

@Component({
  selector: 'app-store',
  imports: [CommonModule, SHARED_MATERIAL_IMPORTS],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {

  products$!: Observable<IProduct[]>;

  constructor(
    private storeService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products$ = this.storeService.getAllProducts('products').pipe(map(((products: IProduct[]) => {
      return products.map((product: IProduct) => ({
        ...product,
        image_url: `images/${product.image_url}`
      }));
    })))
    console.log(this.products$);
    
  }

  selectProduct(id: number) {
    console.log(id);
    this.router.navigate(['product', id])
  }

  AddToCart(id: number) {
    try {
      this.cartService.addToCart({ id: id, amount: 1 });
      console.log(`Added product ${id} to cart. Total items: ${this.cartService.itemCount()}`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

}
