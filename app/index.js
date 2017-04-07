import React from 'react';
import ReactDOM from 'react-dom';

require('./index.scss');

const container = (
  <div>
    <h1>This is JSX!</h1>
  </div>
);

ReactDOM.render(
  container,
  document.getElementById('stage')
);