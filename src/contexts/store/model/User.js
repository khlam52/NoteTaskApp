import { action } from 'easy-peasy';

import StorageService from '../../../services/StorageService';

let initCreateTaskObj = {
  title: '',
  content: '',
  node: 1,
  uid: '',
  parentUid: null,
  status: 'IN_PROGESS',
  createAt: '',
};

export default {
  createTaskObj: initCreateTaskObj,
  recentTaskList: [],

  setCreateTaskObj: action((state, payload) => {
    state.createTaskObj = payload;
    console.log('createTaskObj:', state.createTaskObj);
  }),

  loadRecentTaskList: action((state, payload) => {
    if (payload === null) {
      state.recentTaskList = [];
    } else {
      state.recentTaskList = payload;
    }
  }),
};
