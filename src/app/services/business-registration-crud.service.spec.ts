import { TestBed } from '@angular/core/testing';

import { BusinessRegistrationCRUDService } from '../services/business-registration-crud.service';

describe('BusinessRegistrationCRUDService', () => {
  let service: BusinessRegistrationCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessRegistrationCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
