import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
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
// export class StoreLocationComponent implements OnInit {
//   data: any[] = [];
//   newItem: any = { id: null, name: '' };

//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
//     this.loadData();
//   }

//   loadData(): void {
//     this.dataService.getData().subscribe(data => {
//       this.data = data;
//     });
//   }

//   addItem(): void {
//     this.newItem.id = this.data.length ? Math.max(...this.data.map(item => item.id)) + 1 : 1;
//     this.dataService.addItem(this.newItem).subscribe(() => {
//       this.loadData();
//       this.newItem = { id: null, name: '' };
//     });
//   }

//   prepareUpdate(item: any): void {
//     const updatedItem = { ...item, name: 'Updated ' + item.name };
//     this.updateItem(updatedItem);
//   }

//   updateItem(item: any): void {
//     this.dataService.updateItem(item.id, item).subscribe(() => {
//       this.loadData();
//     });
//   }

//   deleteItem(id: number): void {
//     this.dataService.deleteItem(id).subscribe(() => {
//       this.loadData();
//     });
//   }
// }
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