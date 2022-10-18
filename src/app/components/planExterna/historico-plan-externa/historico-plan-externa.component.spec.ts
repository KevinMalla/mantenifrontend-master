import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPlanExternaComponent } from './historico-plan-externa.component';

describe('HistoricoPlanExternaComponent', () => {
  let component: HistoricoPlanExternaComponent;
  let fixture: ComponentFixture<HistoricoPlanExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPlanExternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPlanExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
