import { observer } from 'mobx-react';
import React from 'react';
import Header from 'src/components/Header/Header';
import Map from 'src/components/Map/Map';
import WeatherHistory from 'src/components/WeatherHistory/WeatherHistory';
import WeatherInfo from 'src/components/WeatherInfo/WeatherInfo';
import s from './Weather.module.scss';

const Weather = () => {
  return (
    <div className={s.wrapper}>
      <Header className={s.header} />
      <div className={s.inner}>
        <WeatherInfo className={s.weather} />
        <WeatherHistory className={s.history} />
        <Map className={s.map} />
      </div>
    </div>
  );
};

export default observer(Weather);
