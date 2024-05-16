import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCatalougeComponent } from './my-catalouge.component';

describe('MyCatalougeComponent', () => {
  let component: MyCatalougeComponent;
  let fixture: ComponentFixture<MyCatalougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCatalougeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCatalougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
