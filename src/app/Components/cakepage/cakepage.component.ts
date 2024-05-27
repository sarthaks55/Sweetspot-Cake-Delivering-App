import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CakeService } from '../../services/cake/cake.service';
import { Cakes } from '../../shared/models/cake';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cakepage',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent,HeaderComponent,FooterComponent],
  templateUrl: './cakepage.component.html',
  styleUrls: ['./cakepage.component.css']
})
export class CakePageComponent implements OnInit {
  cake: Cakes | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cakeService: CakeService,
    private cartService: CartService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.cakeService.getCakeById(params['id']).subscribe((cake) => {
          this.cake = cake;
        }, error => {
          console.error('Error fetching cake', error);
        });
      }
    });
  }

  ngOnInit(): void {}

  addToCart() {
    if (this.cake) {
      this.cartService.addToCart(this.cake);
      this.router.navigateByUrl('/cart-page');
    }
  }
}
