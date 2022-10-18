import { TestBed } from '@angular/core/testing';

import { PlanExternaService } from './plan-externa.service';

describe('PlanExternaService', () => {
  let service: PlanExternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanExternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
