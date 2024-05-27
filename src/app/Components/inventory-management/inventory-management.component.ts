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

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent,TagsComponent, FormsModule, HttpClientModule],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.css'
})
export class InventoryManagementComponent implements OnInit {
  cakes: Cakes[] = [];
  newCake: Cakes = { id: '', name: '', price: 0, favorite: false, stars: 0, imageUrl: '', tags: [] };
  selectedCake: Cakes = { id: '', name: '', price: 0, favorite: false, stars: 0, imageUrl: '', tags: [] };
  isUpdating: boolean = false;

  constructor(private cakeService: CakeService) {}

  ngOnInit(): void {
    this.loadCakes();
  }

  loadCakes(): void {
    this.cakeService.getAll().subscribe(cakes => {
      this.cakes = cakes;
    });
  }

  addCake(): void {
    this.cakeService.addCake(this.newCake).subscribe(() => {
      this.loadCakes();
      this.newCake = { id: '', name: '', price: 0, favorite: false, stars: 0, imageUrl: '', tags: [] };
    });
  }

  populateUpdateForm(cake: Cakes): void {
    this.selectedCake = { ...cake };
    this.isUpdating = true;
  }

  updateCake(): void {
    this.cakeService.updateCake(this.selectedCake.id, this.selectedCake).subscribe(() => {
      this.loadCakes();
      this.isUpdating = false;
      this.selectedCake = { id: '', name: '', price: 0, favorite: false, stars: 0, imageUrl: '', tags: [] };
    });
  }

  deleteCake(id: string): void {
    this.cakeService.deleteCake(id).subscribe(() => {
      this.loadCakes(); // Refresh the list after deleting
    }, error => {
      console.error('Error deleting cake', error);
    });
  }
}
