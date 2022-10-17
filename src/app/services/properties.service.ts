import { Injectable } from '@angular/core';
import { APIResponse, Record, ToggleFavoriteRequest } from '../interfaces/records.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { PropertyInfo } from '@interfaces/property-info.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(private httpClient: HttpClient) {}

  getAllProperties() {
    return this.httpClient
      .get<APIResponse>(
        'https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=7892472&token=AD6110320424834934DE62FD2935A49264B6D947&receipt=undefined'
      )
      .pipe(map(({ records }) => records));
  }

  getPropertyDetails(propertyId: number) {
    return this.httpClient.get<PropertyInfo>(
      `https://app.smartapartmentdata.com/List/json/propertyItem.aspx?listID=7892472&token=AD6110320424834934DE62FD2935A49264B6D947&propertyID=${propertyId}`
    );
  }

  toggleFavorite(payload: ToggleFavoriteRequest) {
    return this.httpClient.post<{ success: boolean }>(
      `https://app.smartapartmentdata.com/List/json/updateListItem.aspx`,
      payload
    );
  }
}
