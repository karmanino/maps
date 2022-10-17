import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialUiModule } from '@shared/material-ui.module';

import { MapComponent } from '@pages/map/map.component';
import { ListComponent } from '@pages/list/list.component';
import { FavButtonComponent } from '@pages/list/fav-button/fav-button.component';
import { FilterPriceRangeComponent } from '@pages/list/filter-price-range/filter-price-range.component';
import { FilterBedroomsComponent } from '@pages/list/filter-bedrooms/filter-bedrooms.component';
import { PropertyComponent } from '@pages/property/property.component';
import { FloorplansComponent } from '@pages/property/floorplans/floorplans.component';
import { OverviewComponent } from '@pages/property/details/details.component';
import { PropertyFavoriteButtonComponent } from '@pages/property/property-favorite-button/property-favorite-button.component';

const components = [
  MapComponent,
  ListComponent,
  PropertyComponent,
  FavButtonComponent,
  FloorplansComponent,
  OverviewComponent,
  PropertyFavoriteButtonComponent,
  FilterPriceRangeComponent,
  FilterBedroomsComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, MaterialUiModule],
})
export class PagesModule {}
