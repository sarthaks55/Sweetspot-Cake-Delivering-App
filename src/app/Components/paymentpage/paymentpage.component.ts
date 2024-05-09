import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Order } from '../../shared/models/order';
import { TitleComponent } from '../title/title.component';
import { OrderItemsListComponent } from '../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../partials/map/map.component';
import { OrderService } from '../../services/order/order.service';


@Component({
  selector: 'app-paymentpage',
  standalone: true,
  imports: [RouterModule,TitleComponent,OrderItemsListComponent,MapComponent],
  templateUrl: './paymentpage.component.html',
  styleUrl: './paymentpage.component.css'
})
export class PaymentpageComponent implements OnInit {

   order:Order = new Order();
  // constructor(orderService: OrderService, router: Router) {
  //     orderService.getNewOrderForCurrentUser().subscribe({
  //       next: (order) => {
  //         this.order = order;
  //       },
  //       error:() => {
  //         router.navigateByUrl('/chekcout');
  //       }
  //     })

  //  }

  ngOnInit(): void {
  }

}