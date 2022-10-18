import { TestBed } from '@angular/core/testing';

import { UTPreventivoService } from './ut-preventivo.service';

describe('UTPreventivoService', () => {
  let service: UTPreventivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UTPreventivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
