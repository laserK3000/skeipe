import React from 'react';
import PropTypes from 'prop-types';


const { createContext, useContext, useCallback } = React;

const ApiServiceContext = createContext(null);

export const ApiServiceProvider = ({ children }) => {

  const getPubs = useCallback(async (lng, lat, distance) => {
    const response = await makeApiRequest('/get_bars_in_vicinity', {
      queryParams: {
        long: lng, lat, distance
      }
    });
    return response;
  }, []);

  const value = {
    getPubs,
  };

  return (
    <ApiServiceContext.Provider value={value}>
      {children}
    </ApiServiceContext.Provider>
  );
};

export const useApiService = () => {
  return useContext(ApiServiceContext);
};

async function makeApiRequest(endpoint, { method = 'GET', body = null, queryParams = {} } = {}) {

  let url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;


  if (Object.keys(queryParams).length > 0) {
    const query = Object.keys(queryParams)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]))
      .join('&');

    url += '?' + query;
  }


  const response = await fetch(url, {
    method,
    headers: {
      // 'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  });

  return response.json();
}

ApiServiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
