import { Injectable } from '@angular/core';
import { Cakes } from '../../shared/models/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {


  getCakeById(cakeId:string):Cakes{
    return this.getAll().find(cake => cake.id == cakeId) ?? new Cakes();
  }

  constructor() { }

  getAll():Cakes[]{
    return [
      {
        id:'1',
        name: 'Banana Cake',
        price: 10,
        favorite: false,
        stars: 4.5,
        imageUrl: 'assets/banana-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'2',
        name: 'Battenberg Cake',
        price: 20,
        favorite: true,
        stars: 4.7,
        imageUrl: 'assets/Battenberg-Cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'3',
        name: 'Black Forest Cake',
        price: 5,
        favorite: false,
        stars: 3.5,
        imageUrl: 'assets/black-forest-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'4',
        name: 'Charlotte Cake',
        price: 2,
        favorite: true,
        stars: 3.3,
        imageUrl: 'assets/Charlotte-Cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'5',
        name: 'Jar Cake',
        price: 11,
        favorite: false,
        stars: 3.0,
        imageUrl: 'assets/jar-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'6',
        name: 'Lemon Cake',
        price: 9,
        favorite: false,
        stars: 4.0,
        imageUrl: 'assets/lemon-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'7',
        name: 'Naked Cake',
        price: 12,
        favorite: false,
        stars: 4.0,
        imageUrl: 'assets/naked-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'8',
        name: 'Carrot Cake',
        price: 9,
        favorite: false,
        stars: 4.0,
        imageUrl: 'assets/carrot-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'3',
        name: 'Black Forest Cake',
        price: 5,
        favorite: false,
        stars: 3.5,
        imageUrl: 'assets/black-forest-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'4',
        name: 'Charlotte Cake',
        price: 2,
        favorite: true,
        stars: 3.3,
        imageUrl: 'assets/Charlotte-Cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'5',
        name: 'Jar Cake',
        price: 11,
        favorite: false,
        stars: 3.0,
        imageUrl: 'assets/jar-cake.jpg',
        tags: ['Cake'],
      },
      {
        id:'6',
        name: 'Lemon Cake',
        price: 9,
        favorite: false,
        stars: 4.0,
        imageUrl: 'assets/lemon-cake.jpg',
        tags: ['Cake'],
      },
      
    ]
    
   
  }

}
