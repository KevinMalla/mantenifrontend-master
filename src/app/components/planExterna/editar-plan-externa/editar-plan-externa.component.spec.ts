import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlanExternaComponent } from './editar-plan-externa.component';

describe('EditarPlanExternaComponent', () => {
  let component: EditarPlanExternaComponent;
  let fixture: ComponentFixture<EditarPlanExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPlanExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlanExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
