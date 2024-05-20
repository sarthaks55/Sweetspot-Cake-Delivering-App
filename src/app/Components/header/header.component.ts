import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserMenuOpen: boolean = false; 
  cartQuantity = 0;
  user: User | null = null;

  constructor(
    cartService: CartService, 
    private userService: UserService, 
    private router: Router,
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.cd.detectChanges(); // Ensure change detection runs
    });
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
    this.user = null; // Explicitly set user to null on logout
    this.cd.detectChanges(); // Ensure change detection runs
    this.router.navigateByUrl('/login');
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
