import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakepageComponent } from './cakepage.component';

describe('CakepageComponent', () => {
  let component: CakepageComponent;
  let fixture: ComponentFixture<CakepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CakepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CakepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
