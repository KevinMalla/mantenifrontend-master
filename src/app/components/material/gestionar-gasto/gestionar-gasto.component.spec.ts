import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarGastoComponent } from './gestionar-gasto.component';

describe('GestionarGastoComponent', () => {
  let component: GestionarGastoComponent;
  let fixture: ComponentFixture<GestionarGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarGastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
