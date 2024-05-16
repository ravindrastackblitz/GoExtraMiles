import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbenRiderStoreCatalougeComponent } from './urben-rider-store-catalouge.component';

describe('UrbenRiderStoreCatalougeComponent', () => {
  let component: UrbenRiderStoreCatalougeComponent;
  let fixture: ComponentFixture<UrbenRiderStoreCatalougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrbenRiderStoreCatalougeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrbenRiderStoreCatalougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
