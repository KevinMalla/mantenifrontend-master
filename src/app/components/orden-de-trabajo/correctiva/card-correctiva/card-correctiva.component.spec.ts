import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCorrectivaComponent } from './card-correctiva.component';

describe('CardCorrectivaComponent', () => {
  let component: CardCorrectivaComponent;
  let fixture: ComponentFixture<CardCorrectivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCorrectivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCorrectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
