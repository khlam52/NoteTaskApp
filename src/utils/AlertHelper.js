import React from 'react';

import i18n from 'i18n-js';
import _ from 'lodash';

import { WarningIcon } from '~src/assets/images';
import RootNavigation from '~src/navigations/RootNavigation';
import { sw } from '~src/styles/Mixins';
import Route from '../navigations/Route';

// alert function expose every params
const showAlert = (
  icon,
  titleText,
  contentText,
  firstButtonText,
  secondButtonText,
  firstButtonHandler,
  secondButtonHandler,
  contentTextToLeft = false,
) => {
  let params = {
    icon,
    titleText,
    contentText,
    firstButtonText,
    secondButtonText,
    firstButtonHandler,
    secondButtonHandler,
    contentTextToLeft,
  };

  RootNavigation.push(Route.ALERT_SCREEN, params);
};

const getCommonAlertIcon = () => {
  return <WarningIcon width={sw(100)} height={sw(100)} />;
};

export default {
  showAlert,
  getCommonAlertIcon,
};
