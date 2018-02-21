import { SUCCESS, user } from '../../constants';

import store from '../../store';

export const handleResponse = (entity, response) => {
  // back-end always place data here
  const data = response.data;
  switch (entity) {
    default:
      return response;
  }
};



