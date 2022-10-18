import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGastoComponent } from './detalle-gasto.component';

describe('DetalleGastoComponent', () => {
  let component: DetalleGastoComponent;
  let fixture: ComponentFixture<DetalleGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleGastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
