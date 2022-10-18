import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanExternaComponent } from './crear-plan-externa.component';

describe('CrearPlanExternaComponent', () => {
  let component: CrearPlanExternaComponent;
  let fixture: ComponentFixture<CrearPlanExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPlanExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPlanExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
