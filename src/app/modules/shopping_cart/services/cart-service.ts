import { computed, Injectable, signal } from '@angular/core';
import { IcartItem } from '../interfaces/cartItem.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public cartItems = signal<IcartItem[]>(this.loadCartFromLocalStorage())

  public itemCount = computed<number>(() =>
    this.cartItems().reduce((acc, item) => acc + item.amount, 0)
  )

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
    this.cartItems.update(items => {
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

  resetCart() {
    this.cartItems.set([]);
    this.saveCartToLocalStorage([]);
  }

}
