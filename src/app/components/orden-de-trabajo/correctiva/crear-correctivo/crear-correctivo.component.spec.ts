import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCorrectivoComponent } from './crear-correctivo.component';

describe('CrearCorrectivoComponent', () => {
  let component: CrearCorrectivoComponent;
  let fixture: ComponentFixture<CrearCorrectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCorrectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCorrectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
