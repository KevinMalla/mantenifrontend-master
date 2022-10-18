import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarDialogComponent } from './borrar-dialog.component';

describe('BorrarDialogComponent', () => {
  let component: BorrarDialogComponent;
  let fixture: ComponentFixture<BorrarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
