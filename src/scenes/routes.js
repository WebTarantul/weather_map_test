import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Weather from './Weather/Weather';

export const routes = {
  home: '/',
  weather: '/weather/:id',
};

export const Router = observer(() => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.home} component={Weather} />
    </Switch>
  </BrowserRouter>
));
