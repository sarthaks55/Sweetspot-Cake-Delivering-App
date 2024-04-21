import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CakeService } from '../../services/cake/cake.service';
import { Cakes } from '../../shared/models/cake';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-cakepage',
  standalone: true,
  imports: [CommonModule, RouterModule,NotFoundComponent],
  templateUrl: './cakepage.component.html',
  styleUrl: './cakepage.component.css'
})
export class CakePageComponent implements OnInit {
  cake!: Cakes;
  constructor(activatedRoute:ActivatedRoute, cakeService:CakeService,
    private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      this.cake = cakeService.getCakeById(params['id']);
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.cake);
    this.router.navigateByUrl('/cart-page');
  }

}