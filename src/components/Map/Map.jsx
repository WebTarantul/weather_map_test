import cn from 'classnames/bind';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import Api from 'src/api';
import { useStore } from 'src/stores/createStore';
import Pin from '../Pin/Pin';
import s from './Map.module.scss';

const cx = cn.bind(s);

const MapBox = ReactMapboxGl({
  accessToken: Api.Map.getToken(),
});

const Map = ({ className }) => {
  const storeGeocoding = useStore((store) => store.geocoding);
  const storeMap = useStore((store) => store.map);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      storeGeocoding.userCoords.add({
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
      });
    });
  }, []);

  const onClickMap = (map, evt) => {
    storeGeocoding.setSelectedCoordinates(evt.lngLat);
  };
  return (
    <div className={cx('container', className)}>
      <MapBox
        onClick={onClickMap}
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        style="mapbox://styles/mapbox/streets-v9"
        center={getSnapshot(storeMap.center)}
      >
        <Pin />
      </MapBox>
    </div>
  );
};

export default observer(Map);
