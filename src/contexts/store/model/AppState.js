import { action } from 'easy-peasy';

import StorageService from '~src/services/StorageService';

export default {
  accessToken: null,
  sessionID: null,
  isFirstOpen: true,
  logonSessionExpiryTime: 15,
  logonSessionWarningTime: 10,
  isHiddenBalance: true,

  setAccessToken: action((state, newAccessToken) => {
    state.accessToken = newAccessToken;
  }),

  setSessionID: action((state, newSessionID) => {
    state.sessionID = newSessionID;
  }),

  setIsFirstOpen: action((state, newIsFirstOpen) => {
    state.isFirstOpen = newIsFirstOpen;
  }),

  setLogonSessionExpiryTime: action((state, newLogonSessionExpiryTime) => {
    state.logonSessionExpiryTime = newLogonSessionExpiryTime;
  }),

  setLogonSessionWarningTime: action((state, newLogonSessionWarningTime) => {
    state.logonSessionWarningTime = newLogonSessionWarningTime;
  }),

  setIsHiddenBalance: action((state, newIsHiddenBalance) => {
    state.isHiddenBalance = newIsHiddenBalance;
    StorageService.setIsHiddenBalance(newIsHiddenBalance);
  }),
};
