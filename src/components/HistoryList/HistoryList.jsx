import cn from 'classnames/bind';
import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from 'src/stores/createStore';
import HistoryItem from '../HistoryItem/HistoryItem';
import s from './HistoryList.module.scss';

const cx = cn.bind(s);

const HistoryList = ({ className }) => {
  const weatherStore = useStore((store) => store.weather);

  return (
    <ul className={cx('wrapper', className)}>
      {weatherStore.items.map((item, index) => (
        <HistoryItem
          item={item}
          index={index}
          key={`${item.id}_${item.coord.lon}_${item.coord.lat}`}
        />
      ))}
    </ul>
  );
};

export default observer(HistoryList);
