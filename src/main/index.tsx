import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from '@/application/components';
import '@/application/styles/global.scss';
import { makeLogin, makeSignUp } from './factories/application';

ReactDOM.render(
  <Router Login={makeLogin} SignUp={makeSignUp} />,
  document.getElementById('main'),
);
