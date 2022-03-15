import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from '@/application/components';
import '@/application/styles/global.scss';
import { makeLogin } from './factories/application';

ReactDOM.render(<Router Login={makeLogin} />, document.getElementById('main'));
