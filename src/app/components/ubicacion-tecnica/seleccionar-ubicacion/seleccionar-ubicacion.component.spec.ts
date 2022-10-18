import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarUbicacionComponent } from './seleccionar-ubicacion.component';

describe('SeleccionarUbicacionComponent', () => {
  let component: SeleccionarUbicacionComponent;
  let fixture: ComponentFixture<SeleccionarUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
