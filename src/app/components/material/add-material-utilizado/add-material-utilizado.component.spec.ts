import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialUtilizadoComponent } from './add-material-utilizado.component';

describe('AddMaterialUtilizadoComponent', () => {
  let component: AddMaterialUtilizadoComponent;
  let fixture: ComponentFixture<AddMaterialUtilizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaterialUtilizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialUtilizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
