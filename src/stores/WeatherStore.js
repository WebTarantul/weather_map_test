import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from './utils';

export const WeatherStore = types
  .model('WeatherStore', {
    fetchWeatherByCoordinates: asyncModel(fetchWeatherByCoordinates),
    items: types.array(types.maybe(types.frozen({}))),
    showedItemIndex: 0,
    historyQuantity: types.optional(types.number, 15),
  })
  .views((self) => ({}))
  .actions((self) => ({
    setItems(weatherData) {
      const index = self.items.findIndex(
        (item) => item.id === weatherData.id,
      );

      if (self.items.length >= self.historyQuantity) {
        self.items = [...self.items.slice(0, self.historyQuantity)];
      }
      if (index !== -1) {
        const newArr = [
          ...self.items.slice(0, index),
          weatherData,
          ...self.items.slice(index + 1),
        ];
        self.items = newArr;
        self.setShowedItem(index);
        return;
      }

      self.items.unshift(weatherData);
      self.setShowedItem(0);
    },
    setHistoryQuantity(quantityString) {
      const num = +quantityString;
      if (!isNaN(num)) {
        self.historyQuantity = num;
      }
    },
    onSubmitQuantity() {
      self.items = [...self.items.slice(0, self.historyQuantity)];
    },
    setShowedItem(item) {
      if (typeof item === 'object') {
        const index = self.items.findIndex((i) => i.id === item.id);

        self.showedItemIndex = index > -1 ? index : 0;
        return;
      }
      self.showedItemIndex = item;
    },
  }));

function fetchWeatherByCoordinates({ lng, lat }) {
  return async function fetchWeatherByCoordinatesFlow(
    flowStore,
    store,
  ) {
    const res = await Api.Weather.fetchWeatherByCoordinates({
      lng,
      lat,
    });
    store.setItems(res.data);
  };
}
