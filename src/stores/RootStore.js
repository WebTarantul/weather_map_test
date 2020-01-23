import { types } from 'mobx-state-tree';
import { MapStore } from './MapStore';
import { GeocodingStore } from './GeocodingStore';
import { WeatherStore } from './WeatherStore';

export const RootStore = types
  .model('RootStore', {
    map: types.optional(MapStore, {}),
    geocoding: types.optional(GeocodingStore, {}),
    weather: types.optional(WeatherStore, {}),
  })
  .actions((self) => ({}));
