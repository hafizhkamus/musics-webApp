import { TestBed } from '@angular/core/testing';

import { LablesRekamanService } from './lables-rekaman.service';

describe('LablesRekamanService', () => {
  let service: LablesRekamanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LablesRekamanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
