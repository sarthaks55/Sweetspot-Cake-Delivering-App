import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor() { }

  create(order:Order){
    
  }

  getNewOrderForCurrentUser(order:Order){
    
  }

}

  // pay(order:Order):Observable<string>{
    
  // }

  // trackOrderById(id:number): Observable<Order>{
    
  // }

