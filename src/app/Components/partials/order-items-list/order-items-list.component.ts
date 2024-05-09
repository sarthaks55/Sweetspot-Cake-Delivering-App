import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-order-items-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent implements OnInit {

  @Input()
  order!:Order;
  constructor() { }

  ngOnInit(): void {
  }

}
