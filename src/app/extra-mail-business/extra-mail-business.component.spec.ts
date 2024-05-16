import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraMailBusinessComponent } from './extra-mail-business.component';

describe('ExtraMailBusinessComponent', () => {
  let component: ExtraMailBusinessComponent;
  let fixture: ComponentFixture<ExtraMailBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraMailBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraMailBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
