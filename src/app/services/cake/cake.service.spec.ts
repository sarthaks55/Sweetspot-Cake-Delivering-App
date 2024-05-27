import { TestBed } from '@angular/core/testing';

import { CakeService } from './cake.service';

describe('CakeService', () => {
  let service: CakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


// getAllFoodsByTag(tag: string,cake: Cakes): Observable<any> {
  //   return this.getAll().pipe(
  //     filter(cake => cake.tags?.includes(tag))
  //   );
  // }