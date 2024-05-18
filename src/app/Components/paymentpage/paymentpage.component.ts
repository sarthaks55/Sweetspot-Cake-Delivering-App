import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order } from '../../shared/models/order';
import { TitleComponent } from '../title/title.component';
import { OrderItemsListComponent } from '../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../partials/map/map.component';
import { OrderService } from '../../services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { Cart } from '../../shared/models/cart';


@Component({
  selector: 'app-paymentpage',
  standalone: true,
  imports: [RouterModule,TitleComponent,OrderItemsListComponent,MapComponent],
  templateUrl: './paymentpage.component.html',
  styleUrl: './paymentpage.component.css'
})
export class PaymentpageComponent implements OnInit {
  order: Order = new Order();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   
  }
}