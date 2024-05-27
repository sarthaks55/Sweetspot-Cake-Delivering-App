import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cakes } from '../../shared/models/cake';
import { Tag, sample_tags } from '../../shared/models/tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private apiUrl = 'http://localhost:3000/api/cakes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cakes[]> {
    return this.http.get<Cakes[]>(this.apiUrl);
  }

  getCakeById(cakeId: string): Observable<Cakes> {
    return this.http.get<Cakes>(`${this.apiUrl}/${cakeId}`);
  }

  addCake(cake: Cakes): Observable<Cakes> {
    return this.http.post<Cakes>(this.apiUrl, cake);
  }

  updateCake(id: string, cake: Cakes): Observable<Cakes> {
    return this.http.put<Cakes>(`${this.apiUrl}/${id}`, cake);
  }

  deleteCake(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Observable<Cakes[]> {
    if (tag === "All") {
      return this.getAll();
    } else {
      return this.getAll().pipe(
        map(cakes => cakes.filter(cake => cake.tags?.includes(tag)))
      );
    }
  }
}


// getAllTags(): Tag[] {
//   return sample_tags;
// }

// getAllFoodsByTag(tag: string): Cakes[] {
//   return tag === "All" ?
//     this.getAll() :
//     this.getAll().filter(cake => cake.tags?.includes(tag));
// }