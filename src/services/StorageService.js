import DataPersister from '~src/utils/DataPersister';

const DB_KEY_SAVED_IS_FIRST_LAUNCH = '@isFirstLaunch';
const DB_KEY_SAVED_LOCALE = '@locale';

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

export default {
  getIsFirstLaunch,
  setIsFirstLaunch,
  setLocale,
  getLocale,
};
