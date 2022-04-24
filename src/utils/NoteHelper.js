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

export default {
  getNoteList,
};
