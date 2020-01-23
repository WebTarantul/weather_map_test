import { types } from 'mobx-state-tree';

export const CoordinatesModel = types
  .model('CoordinatesModel', {
    lng: types.maybeNull(types.number),
    lat: types.maybeNull(types.number),
  })
  .views((self) => ({
    get inArray() {
      return [self.lng, self.lat];
    },
  }))
  .actions((self) => ({
    add({ lng, lat }) {
      self.lng = lng;
      self.lat = lat;
    },
  }));
