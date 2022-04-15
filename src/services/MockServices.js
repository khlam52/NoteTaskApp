import userProfile from '~src/assets/dummy-json/userProfile.json';
import {AppConfig} from '../config';

function getMockData(apiURL, params) {
  switch (apiURL) {
    case AppConfig.GET_USER_PROFILE:
      return userProfile;
    default:
      return {};
  }
}

export default {getMockData};
