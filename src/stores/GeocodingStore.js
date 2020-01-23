import { types, getRoot } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from './utils';
import { CoordinatesModel } from './CoordinatesModel';

export const GeocodingStore = types
  .model('GeocodingStore', {
    query: types.optional(types.string, ''),
    options: types.optional(types.array(types.frozen({})), []),
    selectedCoordinates: types.maybe(types.array(types.number)),
    fetchGeocoding: asyncModel(fetchGeocoding),
    userCoords: types.optional(CoordinatesModel, {}),
  })
  .views((self) => ({
    get selectedCoordinatesObj() {
      if (self.selectedCoordinates !== undefined) {
        return {
          lng: self.selectedCoordinates[0],
          lat: self.selectedCoordinates[1],
        };
      }
      return undefined;
    },
  }))
  .actions((self) => ({
    onSelectItem(index) {
      const select = self.options[index];
      self.selectedCoordinates = select.center;
      getRoot(self).map.setCenter(select.center);
    },
    setOptions(options) {
      self.options = options;
    },
    setQuery(query) {
      self.query = query;
    },
    setSelectedCoordinates({ lng, lat }) {
      self.selectedCoordinates = [lng, lat];
    },
  }));

function fetchGeocoding(query) {
  return async function fetchGeocodingFlow(flowStore, store, root) {
    const res = await Api.Map.fetchGeocoding(query);
    store.setOptions(res.data.features);
  };
}
