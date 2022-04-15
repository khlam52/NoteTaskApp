import { action, thunk } from 'easy-peasy';
import i18n from 'i18n-js';
import _ from 'lodash';

let initFavouritesList = [];

let initBookingHistoryList = [];

let initialUserProfile = {
  uid: 0,
  username: '',
  phone_number: '',
  email: '',
  is_roomer: true,
  favourites: initFavouritesList,
};

export default {
  isLoggedIn: false,
  userProfile: initialUserProfile,
  favouritesList: initFavouritesList,
  bookingHistoryList: initBookingHistoryList,

  // Login
  setLogin: thunk(async (actions, payload) => {
    actions.setLoginState(payload);
    // CustomEventEmitter.emit(CustomEventEmitter.EVENT_USER_LOGIN);
  }),
  setLoginState: action((state, payload) => {
    console.log('User -> setLogin');
    console.log('payload:', payload);
    state.isLoggedIn = true;
    state.userProfile = payload;
    state.userProfile.favourites = payload.favourites;
    state.favouritesList = payload.favourites;
  }),

  setIsLoggedInState: action((state, payload) => {
    state.isLoggedIn = true;
    console.log('state.isLoggedIn:', state.isLoggedIn);
  }),

  // Logout
  setLogoutState: action((state, payload) => {
    console.log('User -> setLogout', payload);
    state.userProfile = initialUserProfile;
    state.userProfile.favourites = initFavouritesList;
    state.favouritesList = initFavouritesList;
    state.isLoggedIn = false;
    console.log('logout isLoggedIn:', state.isLoggedIn);
    console.log('logout userProfile:', state.userProfile);
    console.log('logout favouritesList:', state.favouritesList);
  }),

  setLogout: thunk(async (actions, payload) => {
    //Data Config
    // CustomEventEmitter.emit(CustomEventEmitter.EVENT_USER_LOGOUT);
    actions.setLogoutState(payload);
    // if (_.get(payload, 'is401HandleCase', false) ) {
    // try {
    //   AuthService.logout();
    // } catch (error) {
    //   console.log('User -> AuthService logout -> error :', error);
    // }
    // }
  }),

  updateUserProfile: action((state, payload) => {
    console.log('User -> updateUserProfile');
    console.log('payload:', payload);
    state.userProfile = payload.userProfile;
  }),

  updateEditUserProfile: action((state, payload) => {
    console.log('User -> updateEditUserProfile');
    console.log('payload:', payload);
    state.userProfile.username = payload.username;
    state.userProfile.phone_number = payload.phone_number;
    state.userProfile.email = payload.email;
  }),

  updateUserId: action((state, payload) => {
    state.userProfile.uid = payload.uid;
  }),

  //update favourite list
  updateFavouriteList: action((state, payload) => {
    console.log('User -> updateFavouriteList');
    console.log('updateFavouriteList:', payload);
    state.favouritesList = payload;
    state.userProfile.favourites = payload.favourites;
  }),

  //update booking history list
  updateBookingHistoryList: action((state, payload) => {
    console.log('User -> updateBookingHistoryList');
    console.log('updateBookingHistoryList:', payload);
    state.bookingHistoryList = payload;
  }),
};
