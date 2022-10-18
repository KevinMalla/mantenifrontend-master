import { TestBed } from '@angular/core/testing';

import { PreventivoService } from './preventivo.service';

describe('PreventivoService', () => {
  let service: PreventivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
