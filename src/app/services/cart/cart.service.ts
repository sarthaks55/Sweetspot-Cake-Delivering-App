import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../shared/models/cart';
import { Cakes } from '../../shared/models/cake';
import { CartItem } from '../../shared/models/cartItem';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(cake: Cakes): void {
    let cartItem = this.cart.items
      .find(item => item.cake.id === cake.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(cake));
    this.setCartToLocalStorage();
  }

  removeFromCart(cakeId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.cake.id != cakeId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.cake.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.cake.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
