import { AppConfig } from '../config';
import MockServices from './MockServices';

async function getRequest(apiURL, params, mockUrlParams = '') {
  if (AppConfig.IS_API_MOCK_DATA === 'true') {
    return Promise.resolve(MockServices.getMockData(apiURL, mockUrlParams));
  } else {
    try {
      if (params) {
        console.log('params:', params);
        apiURL = apiURL.concat('?');
        Object.keys(params).forEach(function (key) {
          apiURL = apiURL.concat(key + '=' + params[key] + '&');
          // encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
        });
        apiURL = apiURL.substring(0, apiURL.length - 1);
      }
      let encodeUrl = encodeURI(apiURL);
      console.log('encodeUrl:', encodeUrl);

      let response = await fetch(encodeUrl, {
        method: 'GET',
        headers: new Headers({
          Authorization: AppConfig.AUTH_TOKEN,
        }),
      });
      console.log('original response:', response);
      return Promise.resolve(response.json());
    } catch (error) {
      console.log('error: ', error);
      alert(error);
    }
  }
}

async function postRequest(apiURL, params = {}) {
  if (AppConfig.IS_API_MOCK_DATA === 'true') {
    return Promise.resolve(MockServices.getMockData(apiURL, params));
  }
  console.log('params:', params);
  try {
    let response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({
        Authorization: AppConfig.AUTH_TOKEN,
        'Content-Type': 'application/json',
      }),
    });
    console.log('post response:', response);
    return Promise.resolve(response.json());
  } catch (error) {
    console.log('post method error: ', error);
  }
}

async function putRequest(apiURL, params = {}, mockUrlParams = '') {
  if (AppConfig.IS_API_MOCK_DATA === 'true') {
    return Promise.resolve(MockServices.getMockData(apiURL, mockUrlParams));
  }
  console.log('params in  put method:', JSON.stringify(params));
  try {
    let response = await fetch(apiURL, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: new Headers({
        Authorization: AppConfig.AUTH_TOKEN,
        'Content-Type': 'application/json',
      }),
    });
    console.log('put response:', response);
    return Promise.resolve(response);
  } catch (error) {
    console.log('error: ', error);
    alert(error);
  }

  // return Promise.resolve(response.json());
}

async function deleteRequest(apiURL, params = {}) {
  if (AppConfig.IS_API_MOCK_DATA === 'true') {
    return Promise.resolve(MockServices.getMockData(apiURL, params));
  }
  console.log('params in delete method:', JSON.stringify(params));
  try {
    await fetch(apiURL, {
      method: 'DELETE',
      body: JSON.stringify(params),
      headers: new Headers({
        Authorization: AppConfig.AUTH_TOKEN,
        'Content-Type': 'application/json',
      }),
    });
    // return Promise.resolve(response.json());
  } catch (error) {
    console.log('error: ', error);
    alert(error);
  }

  // return Promise.resolve(response.json());
}

function getUserProfile() {
  return getRequest(AppConfig.GET_USER_PROFILE);
}

function getAllPartyRoomList() {
  return getRequest(AppConfig.GET_ALL_PARTY_ROOM);
}

function postUserLogin(loginParams) {
  return postRequest(AppConfig.POST_USER_LOGIN, loginParams);
}

function postUserCreateAccount(createAccountParams) {
  return postRequest(AppConfig.POST_USER_CREATE_ACCOUNT, createAccountParams);
}

function getPartyRoomByFilter(
  name = '',
  dateTime = '',
  numOfPpl = '',
  area = '',
  district = '',
) {
  let params = { name, dateTime, numOfPpl, area, district };
  return getRequest(AppConfig.GET_PARTY_ROOM_BY_FILTER, params);
}

function getPartyRoomDetail(uid) {
  let params = { uid };
  return getRequest(AppConfig.GET_PARTY_ROOM_DETAIL, params);
}

// WishList
function addWishList(favourites) {
  let params = { favourites };
  return putRequest(AppConfig.ADD_WISHLIST, params);
}

function getWishList() {
  return getRequest(AppConfig.GET_WISHLIST);
}

function deleteWishList(favourites) {
  let params = { favourites };
  return deleteRequest(AppConfig.DELETE_WISHLIST, params);
}

function ChangePassword(old_password, new_password) {
  let params = { old_password, new_password };
  return putRequest(AppConfig.CHANGE_LOGIN_PASSWORD, params);
}

function editUserProfile(username, phone_number, email) {
  let params = { username, phone_number, email };
  return putRequest(AppConfig.EDIT_USER_PROFILE, params);
}

function bookingReserve(createBookingForm) {
  let params = createBookingForm;
  return postRequest(AppConfig.RESERVE_BOOKING, params);
}

function bookingTimeChecking(booking_date, partyroom__uid) {
  let params = { booking_date, partyroom__uid };
  return getRequest(AppConfig.BOOKING_TIME_CHECKING, params);
}

function getBookingHistoryList() {
  return getRequest(AppConfig.GET_BOOKING_HISTORY_LIST);
}

function getBookingHistoryDetail(uid) {
  return getRequest(AppConfig.GET_BOOKING_HISTORY_DETAIL + uid, null, uid);
}

function editBookingDetail(uid, createBookingForm) {
  let params = { createBookingForm };
  return putRequest(AppConfig.EDIT_BOOKING_DETAIL + uid, params, uid);
}

function getPartyRoomReview(partyRoomUid) {
  return getRequest(
    AppConfig.GET_PARTY_ROOM_REVIEW + partyRoomUid,
    null,
    partyRoomUid,
  );
}

function createPartyRoomReview(rating, comments, party_room, recommend) {
  let params = { rating, comments, party_room, recommend };
  return postRequest(AppConfig.CREATE_PARTY_ROOM_REVIEW, params);
}

export default {
  getAllPartyRoomList,
  postUserLogin,
  postUserCreateAccount,
  getPartyRoomByFilter,
  getPartyRoomDetail,
  getUserProfile,
  addWishList,
  getWishList,
  deleteWishList,
  ChangePassword,
  editUserProfile,
  bookingReserve,
  bookingTimeChecking,
  getBookingHistoryList,
  getBookingHistoryDetail,
  editBookingDetail,
  getPartyRoomReview,
  createPartyRoomReview,
};
