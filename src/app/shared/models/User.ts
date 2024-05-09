import { Cart } from "./cart";

export class User {
    id?: number;         // Made optional
    name!: string;
    email!: string;
    password!: string;
    address!: string;
    token?: string;      // Made optional
    isAdmin?: boolean;   // Made optional
    cart?: Cart;
}



export interface IUserRegister{
    name : string;
    email : string;
    password : string;
    confirmPassword : string;
    address: string;
    
  }

export interface IUserLogin{
    email:string;
    password:string;
  }