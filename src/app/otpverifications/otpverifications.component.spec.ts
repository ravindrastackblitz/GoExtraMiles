import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPVerificationsComponent } from './otpverifications.component';

describe('OTPVerificationsComponent', () => {
  let component: OTPVerificationsComponent;
  let fixture: ComponentFixture<OTPVerificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTPVerificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OTPVerificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
