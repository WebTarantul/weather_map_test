import cn from 'classnames/bind';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import s from './Dropdown.module.scss';

const cx = cn.bind(s);

const Dropdown = ({ className, onSearch, onSelectItem, options }) => {
  const [value, setValue] = useState('');

  const onChoseItem = (index) => {
    setValue('');

    onSelectItem(index);
  };

  const onChangeSearch = ({ target }) => {
    setValue(target.value);

    if (target.value.length > 2) {
      onSearch(target.value);
    }
  };

  return (
    <div className={cx('container', className)}>
      <input
        className={s.input}
        onChange={onChangeSearch}
        value={value}
        placeholder="Search for a favorite place"
        type="text"
      />
      {value.length > 2 && (
        <ul className={s.list}>
          {options.map((el, index) => (
            <li
              className={s.itemList}
              key={index}
              onClick={onChoseItem.bind(this, index)}
            >
              {el.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(Dropdown);
