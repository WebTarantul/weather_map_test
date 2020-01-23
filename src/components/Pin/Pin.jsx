import React from 'react';
import { Layer, Feature } from 'react-mapbox-gl';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
// import { Test } from './Pin.styles';

const POSITION_CIRCLE_PAINT = {
  'circle-stroke-width': 4,
  'circle-radius': 10,
  'circle-blur': 0.15,
  'circle-color': 'rgba(128, 33, 243, .5)',
  'circle-stroke-color': 'rgba(255, 255, 255, 0.4)',
};

const Pin = () => {
  const storeGeocoding = useStore((store) => store.geocoding);
  const storeMap = useStore((store) => store.map);

  const onDragEnd = (evt) => {
    storeGeocoding.setSelectedCoordinates(evt.lngLat);
  };
  const coords =
    (storeGeocoding.selectedCoordinates &&
      getSnapshot(storeGeocoding.selectedCoordinates)) ||
    storeMap.center;

  return (
    <Layer
      type="circle"
      id="position-marker"
      paint={POSITION_CIRCLE_PAINT}
    >
      <Feature coordinates={coords} draggable onDragEnd={onDragEnd} />
    </Layer>
  );
};

export default observer(Pin);
