import { PropertyInfo } from '@interfaces/property-info.interface';
import { Record } from '@interfaces/records.interface';
import { createAction, props } from '@ngrx/store';

export const propertySelected = createAction(
  '[UI] Property selected and/or fully loaded',
  props<{ record: Record; fullDetail?: PropertyInfo }>()
);

export const propertyUnselected = createAction('[UI] Property unselected');
