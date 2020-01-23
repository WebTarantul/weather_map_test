import { types } from 'mobx-state-tree';

export const MapStore = types
  .model('MapStore', {
    center: types.optional(types.array(types.number), [
      28.468,
      49.232,
    ]), // [lng, lat]
  })
  .views((self) => ({
    get centerCoordsObj() {
      return { lng: self.center[0], lat: self.center[1] };
    },
  }))
  .actions((self) => ({
    setCenter([lng, lat]) {
      self.center = [lng, lat];
    },
  }));
