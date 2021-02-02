import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const DATA_ID = window.location.pathname.match(/\/(\d+)\//)[1];

ReactDOM.render(
  <App _id={DATA_ID} />,
  document.getElementById('img_carousel'),
);
