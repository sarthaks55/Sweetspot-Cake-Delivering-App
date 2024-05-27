import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { TitleComponent } from '../title/title.component';
import { TextInputComponent } from '../partials/text-input/text-input.component';


@Component({
  selector: 'app-store-location',
  standalone: true,
  imports: [CommonModule,FormsModule,TitleComponent,TextInputComponent],
  templateUrl: './store-location.component.html',
  styleUrl: './store-location.component.css'
})
export class StoreLocationComponent implements OnInit {
  stores: any[] = [];
  newStore: any = { id: null, name: '', availability: '', location: '' };
  selectedStore: any = { id: null, name: '', availability: '', location: '' };
  isUpdating: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;
    });
  }

  addStore(): void {
    this.newStore.id = this.stores.length ? Math.max(...this.stores.map(store => store.id)) + 1 : 1;
    this.storeService.addStore(this.newStore).subscribe(() => {
      this.loadStores();
      this.newStore = { id: null, name: '', availability: '', location: '' };
    });
  }

  populateUpdateForm(store: any): void {
    this.selectedStore = { ...store };
    this.isUpdating = true;
  }

  updateStore(): void {
    this.storeService.updateStore(this.selectedStore.id, this.selectedStore).subscribe(() => {
      this.loadStores();
      this.isUpdating = false;
      this.selectedStore = { id: null, name: '', availability: '', location: '' };
    });
  }

  deleteStore(id: number): void {
    this.storeService.deleteStore(id).subscribe(() => {
      this.loadStores();
    });
  }
}