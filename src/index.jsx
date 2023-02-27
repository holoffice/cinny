import React from 'react';
import ReactDom from 'react-dom';
import './font';
import './index.scss';

import settings from './client/state/settings';
import iFrameApi from './client/iframe/api';

import App from './app/pages/App';

settings.applyTheme();
iFrameApi.init();

ReactDom.render(<App />, document.getElementById('root'));
