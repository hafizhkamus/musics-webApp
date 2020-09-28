import { TestBed } from '@angular/core/testing';

import { LaguService } from './lagu.service';

describe('LaguService', () => {
  let service: LaguService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaguService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
