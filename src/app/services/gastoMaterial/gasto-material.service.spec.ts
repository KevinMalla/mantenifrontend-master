import { TestBed } from '@angular/core/testing';

import { GastoMaterialService } from './gasto-material.service';

describe('GastoMaterialService', () => {
  let service: GastoMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastoMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
