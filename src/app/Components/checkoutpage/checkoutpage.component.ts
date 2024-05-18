import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../shared/models/order';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderItemsListComponent } from '../partials/order-items-list/order-items-list.component';
import { TitleComponent } from '../title/title.component';
import { TextInputComponent } from '../partials/text-input/text-input.component';
import { MapComponent } from '../partials/map/map.component';
import { Cart } from '../../shared/models/cart';
import { HeaderComponent } from '../header/header.component';

declare var Razorpay: any;

@Component({
  selector: 'app-checkoutpage',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,TextInputComponent,OrderItemsListComponent,TitleComponent,MapComponent,HeaderComponent],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css'
})


export class CheckoutpageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
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

    // Log the order 
    console.log(this.order);

    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.order.totalPrice*100,
      name: this.order.name,
      key: 'rzp_test_cs7r2ddg13RbpR',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n4D5jth4fm4GE7ut7lWW-04lnDO2OkD-sg&usqp=CAU',
      prefill: {
        name: this.order.name,
      },
      theme: {
        color: '#6466e3'
      },
      handler: (response: any) => {
        console.log('Payment successful', response);
        // Navigate to the track page within Angular zone
        this.ngZone.run(() => {
          this.router.navigate(['/track']);
        });
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    // const successCallback = (paymentid: any) => {
    //   console.log(paymentid);
    //   this.router.navigateByUrl('/track');
    // }

    // const failureCallback = (e: any) => {
    //   console.log(e);
    // }

    Razorpay.open(RozarpayOptions)
  }

  

}


















// export class CheckoutpageComponent implements OnInit {
//   order: Order = new Order();
//   checkoutForm!: FormGroup;

//   constructor(
//     private cartService: CartService,
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Subscribe to cart observable to get the cart data
//     this.cartService.getCartObservable().subscribe((cart: Cart) => {
//       if (cart) {
//         this.order.items = cart.items;
//         this.order.totalPrice = cart.totalPrice;

//         // Initialize form with current user's name and address
//         const currentUser = this.userService.currentUser;
//         this.checkoutForm = this.formBuilder.group({
//           name: [currentUser.name, Validators.required],
//           address: [currentUser.address, Validators.required]
//         });
//       }
//     });
//   }

//   get fc() {
//     return this.checkoutForm.controls;
//   }

//   createOrder() {
//     if (this.checkoutForm.invalid) {
//       return;
//     }

//     // Assign form values to order object
//     this.order.name = this.fc['name'].value;
//     this.order.address = this.fc['address'].value;

//     // Log the order 
//     console.log(this.order);

//     // Call payNow to initiate payment
//     this.payNow();
//   }

//   payNow() {
//     const amountInPaise = this.order.totalPrice * 100; // Convert to paise
//     console.log('Amount in paise:', amountInPaise);

//     const razorpayOptions = {
//       description: 'Sample Razorpay demo',
//       currency: 'INR',
//       amount: amountInPaise, // amount in paise
//       name: this.order.name,
//       key: 'rzp_test_cs7r2ddg13RbpR', // Replace with your Razorpay API key
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n4D5jth4fm4GE7ut7lWW-04lnDO2OkD-sg&usqp=CAU',
//       prefill: {
//         name: this.order.name,
//       },
//       theme: {
//         color: '#6466e3'
//       },
//       modal: {
//         ondismiss: () => {
//           console.log('Payment popup closed');
//         }
//       },
//       handler: (response: any) => {
//         console.log('Payment successful', response);
//         // Handle payment success here
//       }
//     };

//     try {
//       const rzp1 = new Razorpay(razorpayOptions);
//       rzp1.open();
//     } catch (error) {
//       console.error('Error in Razorpay integration', error);
//     }
//   }
// }