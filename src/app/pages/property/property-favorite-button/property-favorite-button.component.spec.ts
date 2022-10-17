import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFavoriteButtonComponent } from './property-favorite-button.component';

describe('PropertyFavoriteButtonComponent', () => {
  let component: PropertyFavoriteButtonComponent;
  let fixture: ComponentFixture<PropertyFavoriteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyFavoriteButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyFavoriteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
