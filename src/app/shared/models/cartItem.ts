import { Cakes } from "./cake";

export class CartItem{
  constructor(public cake:Cakes){ }
  quantity:number = 1 ;
  price: number = this.cake.price;
}