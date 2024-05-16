import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchCardInsightsComponent } from './scratch-card-insights.component';

describe('ScratchCardInsightsComponent', () => {
  let component: ScratchCardInsightsComponent;
  let fixture: ComponentFixture<ScratchCardInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScratchCardInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchCardInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
