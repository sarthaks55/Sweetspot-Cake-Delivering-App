import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../shared/models/order';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderItemsListComponent } from '../partials/order-items-list/order-items-list.component';
import { TitleComponent } from '../title/title.component';
import { TextInputComponent } from '../partials/text-input/text-input.component';
import { MapComponent } from '../partials/map/map.component';
import { Cart } from '../../shared/models/cart';



@Component({
  selector: 'app-checkoutpage',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,TextInputComponent,OrderItemsListComponent,TitleComponent,MapComponent],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css'
})
export class CheckoutpageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Subscribe to cart observable to get the cart data
    this.cartService.getCartObservable().subscribe((cart: Cart) => {
      if (cart) {
        this.order.items = cart.items;
        this.order.totalPrice = cart.totalPrice;

        // Initialize form with current user's name and address
        const currentUser = this.userService.currentUser;
        this.checkoutForm = this.formBuilder.group({
          name: [currentUser.name, Validators.required],
          address: [currentUser.address, Validators.required]
        });
      }
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      return;
    }

    // Assign form values to order object
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    // Log the order (you can perform further actions like submitting to backend)
    console.log(this.order);
  }
}