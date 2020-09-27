import { TestBed } from '@angular/core/testing';

import { ArtisService } from './artis.service';

describe('ArtisService', () => {
  let service: ArtisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
