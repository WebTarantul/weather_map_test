import React from 'react';
import cn from 'classnames/bind';
import { useStore } from 'src/stores/createStore';
import s from './Header.module.scss';
import { ReactComponent as Logo } from '../../assets/images/forecast.svg';
import Dropdown from '../Dropdown/Dropdown';

const cx = cn.bind(s);

const Header = ({ className }) => {
  const storeGeocoding = useStore((store) => store.geocoding);
  const onSelectItem = (index) => {
    storeGeocoding.onSelectItem(index);
  };

  const onSearch = async (query) => {
    storeGeocoding.setQuery(query);
    await storeGeocoding.fetchGeocoding.run(query);
  };
  return (
    <div className={cx('wrapper', className)}>
      <div className={s.inner}>
        <div className={s.left}>
          <Logo width="50" />
        </div>
        <div className={s.right}>
          <Dropdown
            onSearch={onSearch}
            onSelectItem={onSelectItem}
            options={storeGeocoding.options}
            className={s.dropdown}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
