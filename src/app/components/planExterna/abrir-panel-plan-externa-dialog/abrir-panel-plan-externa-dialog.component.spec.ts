import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirPanelPlanExternaDialogComponent } from './abrir-panel-plan-externa-dialog.component';

describe('AbrirPanelPlanExternaDialogComponent', () => {
  let component: AbrirPanelPlanExternaDialogComponent;
  let fixture: ComponentFixture<AbrirPanelPlanExternaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbrirPanelPlanExternaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirPanelPlanExternaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
