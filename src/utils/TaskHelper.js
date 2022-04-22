import _ from 'lodash';
import StorageService from '../services/StorageService';

// Get Task List From Local Storage
const getTaskList = async (loadRecentTaskList) => {
  try {
    let response = await StorageService.getTaskList();
    loadRecentTaskList(response);
    console.log('recentTaskList:', response);
  } catch (error) {
    console.log('getTaskList error->:', error);
  }
};

const reCorrectTaskList = (recentTaskList, loadRecentTaskList) => {
  recentTaskList.map((item, index) => {
    let subTaskList = [];
    let completedLists = [];
    if (item.node === 1) {
      subTaskList = _.filter(recentTaskList, { parentUid: item.uid });
      completedLists = _.filter(subTaskList, {
        status: 'COMPLETED',
      });
      if (item.status === 'COMPLETED') {
        recentTaskList.map((subItem) => {
          if (subItem.parentUid === item.uid) {
            subItem.status = 'COMPLETED';
          }
        });
      }
      if (
        item.status === 'IN_PROGRESS' &&
        subTaskList.length === completedLists.length
      ) {
        recentTaskList.map((subItem) => {
          if (subItem.parentUid === item.uid) {
            subItem.status = 'IN_PROGRESS';
          }
        });
      }
    }
  });
  StorageService.setTaskList(recentTaskList);
  getTaskList(loadRecentTaskList);
};

const reCorrectTaskListBySubtask = (recentTaskList, loadRecentTaskList) => {
  recentTaskList.map((item, index) => {
    let subTaskList = [];
    let completedLists = [];
    if (item.node === 1) {
      subTaskList = _.filter(recentTaskList, { parentUid: item.uid });
      completedLists = _.filter(subTaskList, {
        status: 'COMPLETED',
      });
      if (
        subTaskList.length > 0 &&
        subTaskList.length === completedLists.length
      ) {
        item.status = 'COMPLETED';
      } else if (
        subTaskList.length > 0 &&
        subTaskList.length > completedLists.length
      ) {
        item.status = 'IN_PROGRESS';
      }
    }
  });
  StorageService.setTaskList(recentTaskList);
  getTaskList(loadRecentTaskList);
};

// Restructure the Task list
const restructureTaskListFunc = (
  recentTaskList,
  restructureTaskList,
  setRestructureTaskList,
  loadRecentTaskList,
) => {
  let completedList = [];
  let inProgressList = [];
  recentTaskList.map((item, index) => {
    let subTaskList = [];

    // get subtask list of each task
    if (item.node === 1) {
      subTaskList = _.filter(recentTaskList, { parentUid: item.uid });
    }
    let data = {
      ...item,
      subTask: subTaskList,
    };
    if (item.status === 'IN_PROGRESS') {
      inProgressList.push(data);
    } else {
      completedList.push(data);
    }
  });
  setRestructureTaskList([
    {
      groupName: 'Completed',
      data: completedList,
    },
    {
      groupName: 'In Progress',
      data: inProgressList,
    },
  ]);
  console.log('restructureTaskList:', restructureTaskList);
};

export default {
  getTaskList,
  restructureTaskListFunc,
  reCorrectTaskList,
  reCorrectTaskListBySubtask,
};
