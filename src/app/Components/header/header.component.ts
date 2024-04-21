import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  cartQuantity=0;
  
  loggedUser: any;
  constructor(private router: Router,cartService:CartService) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
  }

  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
