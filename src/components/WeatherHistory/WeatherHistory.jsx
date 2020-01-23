import cn from 'classnames/bind';
import React from 'react';
import HistoryHeader from '../HistoryHeader/HistoryHeader';
import HistoryList from '../HistoryList/HistoryList';
import s from './WeatherHistory.module.scss';

const cx = cn.bind(s);

const WeatherHistory = ({ className }) => {
  return (
    <div className={cx('wrapper', className)}>
      <HistoryHeader />
      <HistoryList />
    </div>
  );
};

export default WeatherHistory;
