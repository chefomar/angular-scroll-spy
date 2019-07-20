import { InjectionToken } from '@angular/core';

export const RESIZE_TIME_THRESHOLD = new InjectionToken('Time in milli-seconds', {
  providedIn: 'root',
  factory: () => 300
});
