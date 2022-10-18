import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPreventivoComponent } from './plan-preventivo.component';

describe('PlanPreventivoComponent', () => {
  let component: PlanPreventivoComponent;
  let fixture: ComponentFixture<PlanPreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
