import { TestBed } from '@angular/core/testing';

import { StoretimingService } from './storetiming.service';

describe('StoretimingService', () => {
  let service: StoretimingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoretimingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
