import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from 'src/stores/createStore';
import s from './HistoryHeader.module.scss';

const HistoryHeader = (props) => {
  const weatherStore = useStore((store) => store.weather);
  const { setHistoryQuantity, onSubmitQuantity } = weatherStore;
  const onChangeQuantity = (evt) => {
    setHistoryQuantity(evt.target.value);
  };
  const onSubmitForm = (evt) => {
    evt.preventDefault();
    onSubmitQuantity();
  };

  return (
    <header className={s.wrapper}>
      <div className={s.inner}>
        <span className={s.tittle}>History</span>
        <div className={s.right}>
          <span>History quantity:</span>
          <form action="#" onSubmit={onSubmitForm}>
            <input
              type="text"
              value={weatherStore.historyQuantity}
              onChange={onChangeQuantity}
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default observer(HistoryHeader);
