import { action } from 'easy-peasy';

let initCreateTaskObj = {
  title: '',
  content: '',
  node: 1,
  uid: '',
  parentUid: null,
  status: 'IN_PROGESS',
  createAt: '',
};

let initCreateNoteObj = {
  title: '',
  content: [],
  createAt: '',
  uid: '',
};

export default {
  createTaskObj: initCreateTaskObj,
  recentTaskList: [],
  recentNoteList: [],

  setCreateTaskObj: action((state, payload) => {
    state.createTaskObj = payload;
    console.log('createTaskObj:', state.createTaskObj);
  }),

  // Task
  loadRecentTaskList: action((state, payload) => {
    if (payload === null) {
      state.recentTaskList = [];
    } else {
      state.recentTaskList = payload;
    }
  }),

  // Note
  loadRecentNoteList: action((state, payload) => {
    if (payload === null) {
      state.recentNoteList = [];
    } else {
      state.recentNoteList = payload;
    }
  }),
};
