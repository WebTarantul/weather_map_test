import Axios from 'axios';

export const Map = {
  _token:
    'pk.eyJ1Ijoid2VidGFyYW50dWwiLCJhIjoiY2s1bzMyNXdsMG50MDNqbDUzaG84ZnI0NiJ9.wKA8FoNquqDnmkHui241qw',
  _geocodingUrl: 'https://api.mapbox.com/geocoding/v5',

  getToken() {
    return this._token;
  },

  fetchGeocoding(query) {
    return Axios.get(
      `${
        this._geocodingUrl
      }/mapbox.places/${query}.json?access_token=${this.getToken()}`,
    );
  },
};

export const Weather = {
  _baseUrl: 'https://api.openweathermap.org/data/2.5/weather',

  _apiKey: '86115c01a5554f90af05c2cb92289493',
  _units: 'metric', // or "imperial" for temp in Fahrenheit
  _lang: 'en',

  fetchWeatherByCoordinates({ lng, lat }) {
    return Axios.get(
      `${this._baseUrl}?lat=${lat}&lon=${lng}&units=${this._units}&lang=${this._lang}&appid=${this._apiKey}`,
    );
  },
};
