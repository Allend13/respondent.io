import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './history';
import {} from './constants';

import {
  App, UsersList

} from './components';


export default (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' title={'Опрос'} component={App}>
        <IndexRoute component={UsersList}/>
      </Route>
    </Router>
  </Provider>
);
