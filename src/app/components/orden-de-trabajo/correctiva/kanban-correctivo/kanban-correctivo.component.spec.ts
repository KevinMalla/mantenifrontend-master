import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanCorrectivoComponent } from './kanban-correctivo.component';

describe('KanbanCorrectivoComponent', () => {
  let component: KanbanCorrectivoComponent;
  let fixture: ComponentFixture<KanbanCorrectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanCorrectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanCorrectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
