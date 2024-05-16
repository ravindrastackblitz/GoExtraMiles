import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInsightsComponent } from './promotion-insights.component';

describe('PromotionInsightsComponent', () => {
  let component: PromotionInsightsComponent;
  let fixture: ComponentFixture<PromotionInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
