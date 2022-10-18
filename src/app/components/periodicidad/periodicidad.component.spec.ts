import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicidadComponent } from './periodicidad.component';

describe('PeriodicidadComponent', () => {
  let component: PeriodicidadComponent;
  let fixture: ComponentFixture<PeriodicidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
