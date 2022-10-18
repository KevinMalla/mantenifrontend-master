import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlanExternaComponent } from './panel-plan-externa.component';

describe('PanelPlanExternaComponent', () => {
  let component: PanelPlanExternaComponent;
  let fixture: ComponentFixture<PanelPlanExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPlanExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPlanExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
