import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';

import { PropertyInfo } from '@interfaces/property-info.interface';
import { PropertiesService } from '@services/properties.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  selectedRecord: number;
  propertyInfo!: PropertyInfo;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private propertiesSvc: PropertiesService
  ) {
    this.selectedRecord = Number.parseInt(this.route.snapshot.paramMap.get('id') || '');
  }

  ngOnInit(): void {
    this.propertiesSvc.getPropertyDetails(this.selectedRecord).subscribe((fullDetail) => {
      this.propertyInfo = fullDetail;
      this.getThumbnails();
      this.store.dispatch(
        actions.propertySelected({
          record: {
            propertyID: fullDetail.propertyID,
            geocode: fullDetail.geocode,
            favorite: fullDetail.favorite,
          },
          fullDetail,
        })
      );
      this.store
        .select(selectors.selectFullListRecords)
        .pipe(take(1))
        .subscribe((fullList) => {
          if (!fullList.length) this.store.dispatch(actions.loadRecords());
        });
    });
  }

  showList() {
    this.store.dispatch(actions.propertyUnselected());
    this.router.navigate(['/']);
  }

  getThumbnails() {
    this.propertyInfo.thumbnails = this.propertyInfo.photos.slice(0, 3).map((photo) => {
      return photo.replace('standard', 'micros');
    });
  }
}
