// import AlertHelper from '~src/utils/AlertHelper';
// import CommonUtil from '~src/utils/CommonUtil';

export const LANG_EN = 'en';
export const LANG_TC = 'zh-Hant';
export const LANG_SC = 'zh-Hans';
export const CIB_APP_STORE_URL =
  'https://itunes.apple.com/hk/app/shacom-stock/id430305244';
export const CIB_GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.shacom.android';

export const APP_TO_SERVER_LANG_MAP = {
  en: 'en_US',
  'zh-Hant': 'zh_HK',
  'zh-Hans': 'zh_CN',
};

export const SERVER_TO_APP_LANG_MAP = {
  en: 'en',
  'zh-Hant': 'zhhk',
  'zh-Hans': 'zhcn',
};

export const ERROR_CODE_MAP = {
  USER_NAME_EXIST_ERROR_CODE: 'ERROR-4000',
  PHONE_NUM_EXIST_ERROR_CODE: 'ERROR-4010',
  PHONE_NUM_INVALID_ERROR_CODE: 'ERROR-4011',
  EMAIL_FORMAT_INVALID_ERROR_CODE: 'ERROR-4020',
  OLD_PASSWORD_DOES_NOT_MATCH_ERROR: 'ERROR-4040',
};

export const AREA_LIST_MAP = {
  KWN: 'KWN',
  NT: 'NT',
  HKI: 'HKI',
};

export const DISTRICT_LIST_MAP = {
  CW: 'CW',
  WC: 'WC',
  E: 'E',
  S: 'S',
  YTM: 'YTM',
  SSP: 'SSP',
  KC: 'KC',
  WTS: 'WTS',
  KT: 'KT',
  NKT: 'NKT',
  TW: 'TW',
  TM: 'TM',
  YL: 'YL',
  N: 'N',
  TP: 'TP',
  ST: 'ST',
  SK: 'SK',
  I: 'I',
};

export const EMAIL_OTP_FROM_PAGE = {
  ACCOUNT_CERATE: 'ACCOUNT_CERATE',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};
