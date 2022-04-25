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
      itemIndex: index,
      isSelected: false,
    });
  });
  return tempList;
};

const deleteNoteFunc = (
  selectedList,
  recentNoteList,
  loadRecentNoteList,
  setNodeList,
) => {
  let deletedList = _.filter(selectedList, { isSelected: true });
  let deletedIndexList = _.map(deletedList, (item) => {
    return item.itemIndex;
  });
  let newNoteList = [...recentNoteList];
  recentNoteList.map((item, index) => {
    if (deletedIndexList.includes(index)) {
      newNoteList.splice(index, 1);
    }
  });
  StorageService.setNoteList(newNoteList);
  setNodeList(newNoteList);
  getNoteList(loadRecentNoteList);
};

export default {
  getNoteList,
  getSeletedList,
  deleteNoteFunc,
};
