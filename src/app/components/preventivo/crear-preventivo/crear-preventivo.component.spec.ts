import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPreventivoComponent } from './crear-preventivo.component';

describe('CrearPreventivoComponent', () => {
  let component: CrearPreventivoComponent;
  let fixture: ComponentFixture<CrearPreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
