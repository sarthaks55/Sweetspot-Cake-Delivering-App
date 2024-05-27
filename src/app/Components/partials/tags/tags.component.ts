import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { CakeService } from '../../../services/cake/cake.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {  
  tags?:Tag[];
  constructor(cakeService:CakeService) {
    this.tags = cakeService.getAllTags();
   }

  ngOnInit(): void {
  }

}
