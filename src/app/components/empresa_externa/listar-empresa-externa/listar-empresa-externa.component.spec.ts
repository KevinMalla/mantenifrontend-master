import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpresaExternaComponent } from './listar-empresa-externa.component';

describe('ListarEmpresaExternaComponent', () => {
  let component: ListarEmpresaExternaComponent;
  let fixture: ComponentFixture<ListarEmpresaExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEmpresaExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEmpresaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
