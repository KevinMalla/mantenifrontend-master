import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFechaComponent } from './editar-fecha.component';

describe('EditarFechaComponent', () => {
  let component: EditarFechaComponent;
  let fixture: ComponentFixture<EditarFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
