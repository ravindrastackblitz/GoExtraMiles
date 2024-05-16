import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTDetailsComponent } from './gstdetails.component';

describe('GSTDetailsComponent', () => {
  let component: GSTDetailsComponent;
  let fixture: ComponentFixture<GSTDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GSTDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GSTDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
