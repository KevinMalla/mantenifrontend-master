import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpresaExternaComponent } from './editar-empresa-externa.component';

describe('EditarEmpresaExternaComponent', () => {
  let component: EditarEmpresaExternaComponent;
  let fixture: ComponentFixture<EditarEmpresaExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEmpresaExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEmpresaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
