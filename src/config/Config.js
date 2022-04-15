import env from 'react-native-config';

const config = {
  env: env.ENV,
  isEnableCertPinning: env.IS_ENABLE_CERT_PINNING,
  isEnableClientCertPinning: env.IS_ENABLE_CLIENT_CERT_PINNING,
  clientCertName: env.CLIENT_CERT_NAME,
  clientCertPw: env.CLIENT_CERT_PW,
  version: {
    ios: env.IOS_APP_VERSION,
    android: env.AOS_APP_VERSION,
  },
  build_num: {
    ios: env.IOS_BUILD_VERSION,
    android: env.AOS_BUILD_VERSION,
  },
  api: {
    isMockData: env.IS_MOCK_DATA,
    host: env.API_HOST,
    clientId: env.CLIENT_ID,
    timeout: 30000,
  },
};

export const ENV = config.env;
export const API_HOST = config.api.host; // normal ip : 123.202.137.58:874, my local: 192.168.0.100:8000
export const CLIENT_ID = config.api.clientId;
export const API_TIMEOUT = config.api.timeout;
export const IS_API_MOCK_DATA = config.api.isMockData;
export const IOS_APP_VERSION = config.version.ios;
export const AOS_APP_VERSION = config.version.android;
export const IOS_APP_BUILD_NUM = config.build_num.ios;
export const AOS_APP_BUILD_NUM = config.build_num.android;
export const IS_ENABLE_CERT_PINNING = config.isEnableCertPinning;
export const IS_ENABLE_CLIENT_CERT_PINNING = config.isEnableClientCertPinning;
export const CLIENT_CERT_NAME = config.clientCertName;
export const CLIENT_CERT_PW = config.clientCertPw;

export const default_token = 'Token 0595a42bc8044e07f73e322d7a06bf217561dea2';
export let AUTH_TOKEN = default_token; //default Token 0595a42bc8044e07f73e322d7a06bf217561dea2

// Login and Signup, Edit
export const POST_USER_LOGIN = API_HOST + '/account/token/login/';
export const POST_USER_CREATE_ACCOUNT = API_HOST + '/account/register/';
export const CHANGE_LOGIN_PASSWORD = API_HOST + '/account/change_password/';
export const EDIT_USER_PROFILE = API_HOST + '/account/user/';

// Get User Data
export const GET_USER_PROFILE = API_HOST + '/account/user/';

// Get Party Room Data
export const GET_ALL_PARTY_ROOM = API_HOST + '/api/partyroom/all/';
export const GET_PARTY_ROOM_DETAIL = API_HOST + '/api/partyroom/detail/';
export const GET_PARTY_ROOM_BY_FILTER = API_HOST + '/api/partyroom/filter/';

// Wishlist
export const ADD_WISHLIST = API_HOST + '/account/favourite/';
export const GET_WISHLIST = API_HOST + '/account/favourite/';
export const DELETE_WISHLIST = API_HOST + '/account/favourite/';

// Booking
export const RESERVE_BOOKING = API_HOST + '/api/booking/reserve/';
export const BOOKING_TIME_CHECKING = API_HOST + '/api/booking/check_time/';
export const GET_BOOKING_HISTORY_LIST = API_HOST + '/api/booking/my_bookings/';
export const GET_BOOKING_HISTORY_DETAIL = API_HOST + '/api/booking/my_booking/';
export const EDIT_BOOKING_DETAIL = API_HOST + '/api/booking/my_booking/';

// Room Reviews
export const GET_PARTY_ROOM_REVIEW = API_HOST + '/api/review/';
export const CREATE_PARTY_ROOM_REVIEW = API_HOST + '/api/review/create/';
