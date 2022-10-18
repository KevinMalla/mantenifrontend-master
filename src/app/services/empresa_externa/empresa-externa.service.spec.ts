import { TestBed } from '@angular/core/testing';

import { EmpresaExternaService } from './empresa-externa.service';

describe('EmpresaExternaService', () => {
  let service: EmpresaExternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaExternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
