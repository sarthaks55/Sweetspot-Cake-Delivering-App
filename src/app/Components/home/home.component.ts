import { Component, OnInit } from '@angular/core';
import { CakeService } from '../../services/cake/cake.service';
import { Cakes } from '../../shared/models/cake';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cakes:Cakes[]= [];
  constructor(private ck:CakeService) { }

  ngOnInit(): void {
      this.cakes = this.ck.getAll();
  }


  

}
