import { TestBed } from '@angular/core/testing';

import { ExternaService } from './externa.service';

describe('ExternaService', () => {
  let service: ExternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
