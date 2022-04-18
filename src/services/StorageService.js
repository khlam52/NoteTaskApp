import DataPersister from '~src/utils/DataPersister';

const DB_KEY_SAVED_IS_FIRST_LAUNCH = '@isFirstLaunch';
const DB_KEY_SAVED_LOCALE = '@locale';
const DB_KEY_SAVED_TASK_LIST = '@taskList';

function getIsFirstLaunch() {
  return DataPersister.getBoolean(DB_KEY_SAVED_IS_FIRST_LAUNCH, true);
}
function setIsFirstLaunch(isFirstLaunch) {
  return DataPersister.setBoolean(DB_KEY_SAVED_IS_FIRST_LAUNCH, isFirstLaunch);
}

function setLocale(locale) {
  return DataPersister.setString(DB_KEY_SAVED_LOCALE, locale);
}

function getLocale() {
  return DataPersister.getString(DB_KEY_SAVED_LOCALE);
}

function setTaskList(list) {
  return DataPersister.setJson(DB_KEY_SAVED_TASK_LIST, list);
}

function getTaskList() {
  return DataPersister.getJson(DB_KEY_SAVED_TASK_LIST);
}

export default {
  getIsFirstLaunch,
  setIsFirstLaunch,
  setLocale,
  getLocale,
  setTaskList,
  getTaskList,
};
