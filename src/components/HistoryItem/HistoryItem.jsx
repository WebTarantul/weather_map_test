import cn from 'classnames/bind';
import React from 'react';
import s from './HistoryItem.module.scss';
import { useStore } from 'src/stores/createStore';

const cx = cn.bind(s);

const HistoryItem = ({ item, index, className }) => {
  const weatherStore = useStore((store) => store.weather);
  const setCenter = useStore((store) => store.map.setCenter);
  const setSelectedCoordinates = useStore(
    (store) => store.geocoding.setSelectedCoordinates,
  );
  const onClickItem = (evt) => {
    evt.preventDefault();
    weatherStore.setShowedItem(index);
    setCenter([item.coord.lon, item.coord.lat]);
    setSelectedCoordinates({
      lng: item.coord.lon,
      lat: item.coord.lat,
    });
  };
  return (
    <li className={cx('wrapper', className)}>
      <a href="#" onClick={onClickItem}>
        <span>{item.name}</span>
        <div className={s.coords}>
          <span>{item.coord.lon}</span>
          <span>{item.coord.lat}</span>
        </div>
      </a>
    </li>
  );
};

export default HistoryItem;
