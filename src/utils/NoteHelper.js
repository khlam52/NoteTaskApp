import _ from 'lodash';
import StorageService from '../services/StorageService';

// Get Task List From Local Storage
const getNoteList = async (loadRecentNoteList) => {
  try {
    let response = await StorageService.getNoteList();
    loadRecentNoteList(response);
    console.log('recentNoteList:', response);
  } catch (error) {
    console.log('getNoteList error->:', error);
  }
};

const getSeletedList = (recentNoteList) => {
  let tempList = [];
  recentNoteList.map((item, index) => {
    tempList.push({
      uid: item.uid,
      isSelected: false,
    });
  });
  return tempList;
};

const deleteNoteFunc = async (
  selectedList,
  recentNoteList,
  loadRecentNoteList,
  setNodeList,
) => {
  let deletedList = _.filter(selectedList, { isSelected: true });
  let deletedUidList = _.map(deletedList, (item) => {
    return item.uid;
  });
  console.log('deletedList:', deletedList);
  console.log('deletedUidList:', deletedUidList);
  let newNoteList = [...recentNoteList];
  recentNoteList.map((item, index) => {
    if (deletedUidList.includes(item.uid)) {
      newNoteList = _.reject(newNoteList, { uid: item.uid });
    }
  });
  StorageService.setNoteList(newNoteList);
  setNodeList(newNoteList);
  await getNoteList(loadRecentNoteList);
};

export default {
  getNoteList,
  getSeletedList,
  deleteNoteFunc,
};
