import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../../../shared/interfaces/product.interface';
import { IcartItem } from '../../../interfaces/cartItem.interface';
import { CartService } from '../../../services/cart-service';
import { SHARED_MATERIAL_IMPORTS } from '../../../../../shared/material/material.imports';
import { EmptyCart } from '../../empty-cart/empty-cart';
import { CommonModule } from '@angular/common';
import { map, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  imports: [SHARED_MATERIAL_IMPORTS, EmptyCart, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit, OnDestroy {
  cartProducts: IProduct[] = [];
  cartItems: IcartItem[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  total: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCart(): void {
    try {
      this.isLoading = true;
      this.error = null;
      this.cartItems = this.cartService.cartItemsIndexes();

      if (this.cartItems.length === 0) {
        this.cartProducts = [];
        this.total = 0;
        this.isLoading = false;
        return;
      }

      const ids = this.cartItems.map(item => item.id);
      this.cartService.getCartItems(ids)
        .pipe(
          map(products => {
            return products.map(product => ({
              ...product,
              price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
            }));
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (products) => {
            this.cartProducts = products;
            this.calculateTotal();
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error fetching cart items:', err);
            this.error = 'Failed to load cart items. Please try again.';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
    } catch (err) {
      console.error('Unexpected error loading cart:', err);
      this.error = 'An unexpected error occurred.';
      this.isLoading = false;
    }
  }

  calculateTotal(): void {
    this.total = this.cartProducts.reduce((sum, product) => {
      const cartItem = this.cartItems.find(item => item.id === product.id);
      const quantity = cartItem?.amount || 1;
      return sum + (product.price * quantity);
    }, 0);
  }

  getTotalPrice(): number {
    return this.total;
  }

  getProductQuantity(productId: number): number {
    return this.cartItems.find(item => item.id === productId)?.amount || 0;
  }

  updateQuantity(productId: number, newAmount: number): void {
    try {
      this.cartService.updateQuantity(productId, newAmount);
      this.cartItems = this.cartService.cartItemsIndexes();
      this.calculateTotal();
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Error updating quantity:', err);
      this.error = 'Failed to update quantity.';
    }
  }

  removeItem(productId: number): void {
    try {
      this.cartService.removeFromCart(productId);
      this.cartProducts = this.cartProducts.filter(p => p.id !== productId);
      this.cartItems = this.cartService.cartItemsIndexes();
      this.calculateTotal();
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Error removing item:', err);
      this.error = 'Failed to remove item.';
    }
  }

  clearCart(): void {
    try {
      this.cartService.resetCart();
      this.cartProducts = [];
      this.cartItems = [];
      this.total = 0;
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Error clearing cart:', err);
      this.error = 'Failed to clear cart.';
    }
  }

  trackByProductId(index: number, product: IProduct): number {
    return product.id;
  }

}
