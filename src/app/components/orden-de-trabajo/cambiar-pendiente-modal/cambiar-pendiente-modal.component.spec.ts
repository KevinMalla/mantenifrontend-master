import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPendienteModalComponent } from './cambiar-pendiente-modal.component';

describe('CambiarPendienteModalComponent', () => {
  let component: CambiarPendienteModalComponent;
  let fixture: ComponentFixture<CambiarPendienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarPendienteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarPendienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
