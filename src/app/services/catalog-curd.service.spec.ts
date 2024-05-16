import { TestBed } from '@angular/core/testing';

import { CatalogCURDService } from './catalog-curd.service';

describe('CatalogCURDService', () => {
  let service: CatalogCURDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogCURDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
