import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessCategoryComponent } from './select-business-category.component';

describe('SelectBusinessCategoryComponent', () => {
  let component: SelectBusinessCategoryComponent;
  let fixture: ComponentFixture<SelectBusinessCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBusinessCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBusinessCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
