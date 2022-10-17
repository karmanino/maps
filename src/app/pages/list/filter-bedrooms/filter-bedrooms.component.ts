import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { applyFilter } from '@store/actions';
import { AppState } from '@store/app.reducer';
import { selectBedroomsFilter } from '@store/selectors/records.selectors';

@Component({
  selector: 'app-filter-bedrooms',
  templateUrl: './filter-bedrooms.component.html',
  styleUrls: ['./filter-bedrooms.component.scss'],
})
export class FilterBedroomsComponent {
  bedroomsForm = this.fb.group({
    studio: [true, Validators.required],
    one: [true, Validators.required],
    two: [true, Validators.required],
    three: [true, Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.store.select(selectBedroomsFilter).subscribe((bedroomsFilter) => {
      if (bedroomsFilter) {
        this.bedroomsForm.setValue({
          studio: (bedroomsFilter as Number[]).includes(0),
          one: (bedroomsFilter as Number[]).includes(1),
          two: (bedroomsFilter as Number[]).includes(2),
          three: (bedroomsFilter as Number[]).includes(3),
        });
      }
    });
  }

  saveSelection(){
    let selection: number[] = [];

    if(this.bedroomsForm.value.studio) selection.push(0);
    if(this.bedroomsForm.value.one) selection.push(1);
    if(this.bedroomsForm.value.two) selection.push(2);
    if(this.bedroomsForm.value.three) selection.push(3);

    this.store.dispatch(applyFilter({filters: {bedrooms: selection}}));

  }

}
