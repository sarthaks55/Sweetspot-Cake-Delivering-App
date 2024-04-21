import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../shared/models/cartItem';
import { Cart } from '../../shared/models/cart';
import { CartService } from '../../services/cart/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [RouterModule,CommonModule,NotFoundComponent,HeaderComponent],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.cake.id);
  }

  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.cake.id, quantity);
  }

}
