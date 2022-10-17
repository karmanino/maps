import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Record } from '@interfaces/records.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';
import { take } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  records: Record[] = [];
  filterBedrooms: { active: boolean; textToDisplay?: string } = {
    active: false,
    textToDisplay: 'Studio, 1, 2, 3',
  };
  filterPriceRange: { active: boolean; max?: number } = {
    active: false,
    max: environment.sliderMinMaxPrices[1],
  };

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectors.selectFullListRecords)
      .pipe(take(1))
      .subscribe((fullList) => {
        if (!fullList.length) this.store.dispatch(actions.loadRecords());
      });

    this.store.select(selectors.selectActiveRecords).subscribe((records) => {
      this.records = records;
    });

    this.store.select(selectors.selectFilters).subscribe((filters) => {
      if (filters.onlyFavorites) this.records = this.records.filter(({ favorite }) => favorite);
      if (filters.bedrooms) this.parseBedroomsText(filters.bedrooms);
      if (filters.maxPrice) this.filterPriceRange = { active: false, max: filters.maxPrice };
    });
  }

  viewInfo(record: Record) {
    this.router.navigate(['/', record.propertyID]);
    this.store.dispatch(actions.propertySelected({ record}));
  }

  parseBedroomsText([firstItem, ...rest]: number[]) {
    let newText = firstItem?.toString();
    if (newText === '0') newText = 'Studio';
    rest.forEach((bedrooms) => (newText += `, ${bedrooms}`));
    this.filterBedrooms = { active: false, textToDisplay: newText };
  }
}
