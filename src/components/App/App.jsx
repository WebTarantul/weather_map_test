import { observer } from 'mobx-react';
import React from 'react';
import { Router } from 'src/scenes/routes';
import { createStore, Provider } from 'src/stores/createStore';
import s from './App.module.scss';

const rootStore = createStore();

const App = () => {
  return (
    <Provider value={rootStore}>
      <div className={s.app}>
        <Router />
      </div>
    </Provider>
  );
};

export default observer(App);
