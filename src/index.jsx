import React from 'react';
import ReactDom from 'react-dom';
import './font';
import './index.scss';

import settings from './client/state/settings';
import iFrameApi from './client/iframe/api';

import App from './app/pages/App';
import { retrieveLocalStore } from './client/action/auth';
import { getUrlPrams } from './util/common';

settings.applyTheme();
iFrameApi.init();

const paramUserId = getUrlPrams('userId');
const { userId } = retrieveLocalStore();
if(paramUserId && paramUserId !== userId)
    window.localStorage.clear();

ReactDom.render(<App />, document.getElementById('root'));
