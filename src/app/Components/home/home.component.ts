import { Component, OnInit } from '@angular/core';
import { CakeService } from '../../services/cake/cake.service';
import { Cakes } from '../../shared/models/cake';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagsComponent } from '../partials/tags/tags.component';
import { ItemCategoriesComponent } from '../partials/item-categories/item-categories.component';
import { BannerComponent } from '../partials/banner/banner.component';
import { TrendingItemsComponent } from '../partials/trending-items/trending-items.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent,BannerComponent,TagsComponent,ItemCategoriesComponent,TrendingItemsComponent,FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cakes: Cakes[] = [];

  constructor(private cakeService: CakeService) {}

  ngOnInit(): void {
    this.loadCakes();
  }

  loadCakes(): void {
    this.cakeService.getAll().subscribe(cakes => {
      this.cakes = cakes.filter(cake => (cake.tags ?? []).includes('Home'));
    });
  }
}