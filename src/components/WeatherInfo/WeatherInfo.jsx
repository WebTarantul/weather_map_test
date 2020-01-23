import cn from 'classnames/bind';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import {
  generatePath,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { routes } from 'src/scenes/routes';
import { useStore } from 'src/stores/createStore';
import s from './WeatherInfo.module.scss';

const cx = cn.bind(s);

const WeatherInfo = ({ className }) => {
  const rootStore = useStore();
  const weatherStore = useStore((store) => store.weather);
  const weatherData =
    weatherStore.items[weatherStore.showedItemIndex];
  const coords =
    rootStore.geocoding.selectedCoordinatesObj ||
    rootStore.map.centerCoordsObj;
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname.match(/\d*$/);
    weatherStore.setShowedItem({ id: +id[0] });
  }, []);

  useEffect(() => {
    weatherStore.fetchWeatherByCoordinates.run(coords);

    if (weatherStore.items.length > 0) {
      const { id } = weatherStore.items[weatherStore.showedItemIndex];
      if (id) {
        history.push(generatePath(routes.weather, { id }), { id });
      }
    }
  }, [coords]);

  const normalizeTemp = (temp) => {
    return Math.round(temp);
  };
  const normalizeTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString().slice(0, 5);
  };

  if (weatherStore.fetchWeatherByCoordinates.isLoading) {
    return <h2>Loading...</h2>;
  }

  if (weatherStore.items.length > 0) {
    return (
      <div className={cx('wrapper', className)}>
        <div className={s.mainInfo}>
          <header className={s.header}>
            Weather in
            <b>
              {' '}
              {weatherData.name}, {weatherData.sys.country}{' '}
            </b>
          </header>
          <div className={s.temperature}>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt=""
              srcSet={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            <div className={s.tempBottom}>
              <p className={s.temperatureNum}>
                <b>{normalizeTemp(weatherData.main.temp)}</b>℃
              </p>
              <p className={s.mainDescription}>
                {weatherData.weather[0].description}
              </p>
            </div>
          </div>
        </div>

        <div className={s.coords}>
          <table className={s.coordsTable}>
            <thead>
              <tr>
                <th colSpan="2">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
              <tr>
                <td>{coords.lat.toFixed(6)}</td>
                <td>{coords.lng.toFixed(6)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className={s.descrTable}>
          <tbody>
            <tr>
              <td>Temperature</td>
              <td>{normalizeTemp(weatherData.main.temp)}℃</td>
            </tr>
            <tr>
              <td>Feels like</td>
              <td>{normalizeTemp(weatherData.main.feels_like)}℃</td>
            </tr>
            <tr>
              <td>Max. temp.</td>
              <td>{normalizeTemp(weatherData.main.temp_max)}℃</td>
            </tr>
            <tr>
              <td>Min. temp.</td>
              <td>{normalizeTemp(weatherData.main.temp_min)}℃</td>
            </tr>
            <tr>
              <td>Wind</td>
              <td>{weatherData.wind.speed} m/s</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>{weatherData.main.humidity} %</td>
            </tr>
            <tr>
              <td>Cloudiness</td>
              <td>{weatherData.weather[0].description}</td>
            </tr>
            <tr>
              <td>Sunrise</td>
              <td>{normalizeTime(weatherData.sys.sunrise)}</td>
            </tr>
            <tr>
              <td>Sunset</td>
              <td>{normalizeTime(weatherData.sys.sunset)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default observer(WeatherInfo);
