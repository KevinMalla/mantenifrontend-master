import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanExternaComponent } from './listar-plan-externa.component';

describe('ListarPlanExternaComponent', () => {
  let component: ListarPlanExternaComponent;
  let fixture: ComponentFixture<ListarPlanExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPlanExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlanExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
