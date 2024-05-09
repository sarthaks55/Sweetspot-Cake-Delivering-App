import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../shared/models/cart';
import { Cakes } from '../../shared/models/cake';
import { CartItem } from '../../shared/models/cartItem';
import { UserService } from '../user/user.service';
import { User } from '../../shared/models/User';
 // Import User model

 @Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;

  constructor(private userService: UserService) {
    this.cartSubject = new BehaviorSubject<Cart>(this.getCartFromUser());
  }

  addToCart(cake: Cakes): void {
    const user = this.userService.currentUser;
    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    let cart = user.cart || new Cart();
    let cartItem = cart.items.find(item => item.cake.id === cake.id);

    if (cartItem) {
      cartItem.quantity++; // Increment quantity if cake is already in cart
    } else {
      cart.items.push(new CartItem(cake));
    }

    this.updateCart(user, cart);
  }

  changeQuantity(cakeId: string, quantity: number): void {
    const user = this.userService.currentUser;
    if (!user || !user.cart) {
      return;
    }

    const cartItem = user.cart.items.find(item => item.cake.id === cakeId);
    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.cake.price;
      this.updateCart(user, user.cart); // Update user with modified cart
    }
  }

  removeFromCart(cakeId: string): void {
    const user = this.userService.currentUser;
    if (!user || !user.cart) {
      return;
    }

    user.cart.items = user.cart.items.filter(item => item.cake.id !== cakeId);
    this.updateCart(user, user.cart); // Update user with modified cart
  }

  clearCart(): void {
    const user = this.userService.currentUser;
    if (!user) {
      return;
    }

    user.cart = new Cart();
    this.updateCart(user, user.cart); // Update user with empty cart
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private updateCart(user: User, cart: Cart): void {
    // Recalculate total count and total price
    cart.totalCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.cake.price), 0);

    // Update user's cart and persist to localStorage
    user.cart = cart;
    this.userService.setUserToLocalStorage(user);
    this.cartSubject.next(cart);
  }

  private getCartFromUser(): Cart {
    const user = this.userService.getUserFromLocalStorage();
    return user.cart || new Cart();
  }
}
