import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { applyFilter } from '@store/actions';
import { AppState } from '@store/app.reducer';
import { selectPriceRangeFilter } from '@store/selectors/records.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-filter-price-range',
  templateUrl: './filter-price-range.component.html',
  styleUrls: ['./filter-price-range.component.scss'],
})
export class FilterPriceRangeComponent implements OnInit {

  bounds = environment.sliderMinMaxPrices;
  initialValue!: number;
  newValue: number | null = null;
  slider = new FormControl(this.bounds[1]);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectPriceRangeFilter)
      .pipe(take(1))
      .subscribe((priceFilter) => {
        this.initialValue = priceFilter || this.bounds[1];
        this.slider.setValue(this.initialValue);
      });
  }

  setFilter() {
    this.store.dispatch(
      applyFilter({ filters: { maxPrice: this.slider.value! } })
    );
  }
}
