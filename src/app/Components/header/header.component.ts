import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/models/User';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  cartQuantity=0;
  user!:User;
  constructor(cartService:CartService,private userService:UserService,private router: Router) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
   }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/login')
  }

  get isAuth(){
    return this.user.token;
  }
}