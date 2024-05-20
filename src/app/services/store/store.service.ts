import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/stores';

  constructor(private http: HttpClient) {}

  getStores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addStore(store: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, store);
  }

  updateStore(id: number, updatedStore: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedStore);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
