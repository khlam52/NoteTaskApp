import { action } from 'easy-peasy';

import StorageService from '../../../services/StorageService';

let initCreateTaskObj = {
  title: '',
  content: '',
  node: 1,
  uid: '',
  parentUid: null,
  status: 'IN_PROGESS',
};

export default {
  createTaskObj: initCreateTaskObj,
  recentTaskList: [],

  setCreateTaskObj: action((state, payload) => {
    state.createTaskObj = payload;
    console.log('createTaskObj:', state.createTaskObj);
  }),

  loadRecentTaskList: action((state, payload) => {
    console.log('loadRecentTaskList:', payload);
    state.recentTaskList = payload;
    console.log('state.recentTaskList:', state.recentTaskList);
  }),
};
