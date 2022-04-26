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

const reCorrectTaskList = async (taskList, loadRecentTaskList) => {
  taskList.map((item, index) => {
    let subTaskList = [];
    let completedLists = [];
    if (item.node === 1) {
      subTaskList = _.filter(taskList, { parentUid: item.uid });
      completedLists = _.filter(subTaskList, {
        status: 'COMPLETED',
      });
      if (item.status === 'COMPLETED') {
        taskList.map((subItem) => {
          if (subItem.parentUid === item.uid) {
            subItem.status = 'COMPLETED';
          }
        });
      }
      if (
        item.status === 'IN_PROGRESS' &&
        subTaskList.length === completedLists.length
      ) {
        taskList.map((subItem) => {
          if (subItem.parentUid === item.uid) {
            subItem.status = 'IN_PROGRESS';
          }
        });
      }
    }
  });
  StorageService.setTaskList(taskList);
  await getTaskList(loadRecentTaskList);
};

const reCorrectTaskListBySubtask = async (taskList, loadRecentTaskList) => {
  taskList.map((item, index) => {
    let subTaskList = [];
    let completedLists = [];
    if (item.node === 1) {
      subTaskList = _.filter(taskList, { parentUid: item.uid });
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
  StorageService.setTaskList(taskList);
  await getTaskList(loadRecentTaskList);
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

const deleteTaskFunc = async (
  recentTaskList,
  loadRecentTaskList,
  item,
  index,
  isSubTask = false,
) => {
  console.log('subItem:', item);
  let taskList = [...recentTaskList];
  console.log('taskList before:', taskList);

  let deleteTaskList = _.reject(taskList, { uid: item.uid });
  if (!isSubTask) {
    deleteTaskList = _.reject(deleteTaskList, { parentUid: item.uid });
  }
  console.log('deleteTaskList:', deleteTaskList);
  if (isSubTask) {
    await reCorrectTaskListBySubtask(deleteTaskList, loadRecentTaskList);
  } else {
    await reCorrectTaskList(deleteTaskList, loadRecentTaskList);
  }
};

const getZhhkMonth = (month) => {
  switch (month) {
    case 'January':
      return 1;
    case 'February':
      return 2;
    case 'March':
      return 3;
    case 'April':
      return 4;
    case 'May':
      return 5;
    case 'June':
      return 6;
    case 'July':
      return 7;
    case 'August':
      return 8;
    case 'September':
      return 9;
    case 'October':
      return 10;
    case 'November':
      return 11;
    case 'December':
      return 12;
  }
};

const getZhhkWeekdayList = (weekday) => {
  switch (weekday) {
    case 'Mon':
      return '一';
    case 'Tue':
      return '二';
    case 'Wed':
      return '三';
    case 'Thu':
      return '四';
    case 'Fri':
      return '五';
    case 'Sat':
      return '六';
    case 'Sun':
      return '日';
  }
};

const getZhhkTimeFormat = (date, locale) => {
  let splitdate = date.split(' ');
  console.log('splitdate:', splitdate);
  console.log('locale:', locale);
  if (locale === 'zh-Hant') {
    let year = splitdate[2].replace(/,/g, '');
    return (
      year +
      '年' +
      getZhhkMonth(splitdate[1]) +
      '月' +
      splitdate[0] +
      '日星期' +
      getZhhkWeekdayList(splitdate[3]) +
      ' ' +
      splitdate[4]
    );
  }
  return date;
};

export default {
  getTaskList,
  restructureTaskListFunc,
  reCorrectTaskList,
  reCorrectTaskListBySubtask,
  deleteTaskFunc,
  getZhhkTimeFormat,
};
