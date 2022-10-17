import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBedroomsComponent } from './filter-bedrooms.component';

describe('FilterBedroomsComponent', () => {
  let component: FilterBedroomsComponent;
  let fixture: ComponentFixture<FilterBedroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterBedroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBedroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
