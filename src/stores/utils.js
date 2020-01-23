import {
  getParent,
  getRoot,
  types,
  onSnapshot,
  applySnapshot,
} from 'mobx-state-tree';

export function asyncModel(thunk, auto = true) {
  const AsyncModel = types
    .model('AsyncModel', {
      isLoading: false,
      isError: false,
      isSuccess: false,
    })
    .actions((self) => ({
      run(...args) {
        const promise = thunk(...args)(
          self,
          getParent(self),
          getRoot(self),
        );
        if (auto) {
          self._auto(promise);
        }
        return promise;
      },
      start() {
        self.isLoading = true;
        self.isError = false;
        self.isSuccess = false;
      },
      success() {
        self.isLoading = false;
        self.isError = false;
        self.isSuccess = true;
      },
      error(error) {
        self.isLoading = false;
        self.isSuccess = false;
        self.isError = true;
      },
      async _auto(promise) {
        try {
          self.start();
          await promise;
          self.success();
        } catch (error) {
          self.error(error);
          throw error;
        }
      },
    }));

  return types.optional(AsyncModel, {});
}

export function createPersist(store) {
  onSnapshot(store, (snapshot) => {
    // eslint-disable-next-line no-undef

    localStorage.setItem(
      '___persistWeather',
      JSON.stringify({
        weather: {
          items: snapshot.weather && snapshot.weather.items,
          showedItemIndex: snapshot.weather.showedItemIndex,
          historyQuantity: snapshot.weather.historyQuantity,
        },
        map: {
          center: snapshot.map && snapshot.map.center,
        },
      }),
    );
  });

  function rehydrate() {
    // eslint-disable-next-line no-undef
    const snapshot = localStorage.getItem('___persistWeather');
    if (snapshot) {
      applySnapshot(store, JSON.parse(snapshot));
    }
  }

  return {
    rehydrate,
  };
}
