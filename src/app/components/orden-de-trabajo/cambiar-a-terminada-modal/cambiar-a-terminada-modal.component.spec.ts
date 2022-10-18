import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarATerminadaModalComponent } from './cambiar-a-terminada-modal.component';

describe('CambiarATerminadaModalComponent', () => {
  let component: CambiarATerminadaModalComponent;
  let fixture: ComponentFixture<CambiarATerminadaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarATerminadaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarATerminadaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
