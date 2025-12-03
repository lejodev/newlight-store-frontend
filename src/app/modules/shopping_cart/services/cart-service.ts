import { computed, Injectable, signal } from '@angular/core';
import { IcartItem } from '../interfaces/cartItem.interface';
import { Http } from '../../../core/services/http/http';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private http: Http) { }

  public cartItemsIndexes = signal<IcartItem[]>(this.loadCartFromLocalStorage())

  public itemCount = computed<number>(() =>
    this.cartItemsIndexes().reduce((acc, item) => acc + item.amount, 0)
  )

  public cartTotal = computed<number>(() => {
    return 0;
  })

  private loadCartFromLocalStorage(): IcartItem[] {
    const cart = localStorage.getItem('cart')
    if (!cart) {
      return []
    } else {
      return JSON.parse(cart) as IcartItem[]
    }
  }

  private saveCartToLocalStorage(items: IcartItem[]): void {
    try {
      const serializedItems = JSON.stringify(items);
      localStorage.setItem('cart', serializedItems);
    } catch (error) {
      console.error('Cannot set cart')
    }
  }

  addToCart(newCartItem: IcartItem): void {
    this.cartItemsIndexes.update(items => {
      const updatedItems = [...items]

      const existingProduct = items.findIndex(item => item.id === newCartItem.id)
      if (existingProduct > -1) {
        updatedItems[existingProduct].amount += newCartItem.amount
      } else {
        updatedItems.push(newCartItem)
      }
      this.saveCartToLocalStorage(updatedItems);
      return updatedItems
    })
  }

  getCartItems(ids: number[]):Observable<IProduct[]> {
    const body = { ids };
    const items = this.http.post<IProduct[]>(`products/many/by-ids`, body);
    return items
    
  }

  resetCart(): void {
    try {
      this.cartItemsIndexes.set([]);
      this.saveCartToLocalStorage([]);
    } catch (error) {
      console.error('Error resetting cart:', error);
    }
  }

  removeFromCart(id: number): void {
    try {
      this.cartItemsIndexes.update(items => {
        const filtered = items.filter(item => item.id !== id);
        this.saveCartToLocalStorage(filtered);
        return filtered;
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  updateQuantity(id: number, amount: number): void {
    try {
      if (amount <= 0) {
        this.removeFromCart(id);
        return;
      }
      this.cartItemsIndexes.update(items => {
        const updated = items.map(item =>
          item.id === id ? { ...item, amount } : item
        );
        this.saveCartToLocalStorage(updated);
        return updated;
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

}
