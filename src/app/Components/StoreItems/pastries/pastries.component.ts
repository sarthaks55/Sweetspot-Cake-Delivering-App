import { Component, OnInit } from '@angular/core';
import { Cakes } from '../../../shared/models/cake';
import { CakeService } from '../../../services/cake/cake.service'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../Components/header/header.component';
import { FooterComponent } from '../../../Components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-pastries',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, HttpClientModule],
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.css'
})
export class PastriesComponent implements OnInit {
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