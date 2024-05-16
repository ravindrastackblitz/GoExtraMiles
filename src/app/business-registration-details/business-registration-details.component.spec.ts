import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRegistrationDetailsComponent } from './business-registration-details.component';

describe('BusinessRegistrationDetailsComponent', () => {
  let component: BusinessRegistrationDetailsComponent;
  let fixture: ComponentFixture<BusinessRegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRegistrationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
