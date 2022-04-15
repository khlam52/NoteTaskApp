import { action } from 'easy-peasy';

export default {
  isLoadingPartyRoomList: true,
  isLoadingHistoryList: true,
  isLoadingFavouriteList: true,

  setIsLoadingPartyRoomList: action((state, payload) => {
    state.isLoadingPartyRoomList = payload;
  }),

  setIsLoadingHistoryList: action((state, payload) => {
    state.isLoadingHistoryList = payload;
  }),

  setIsLoadingFavouriteList: action((state, payload) => {
    state.isLoadingFavouriteList = payload;
  }),
};
