/* eslint-disable react/prop-types */
import React, {useMemo, useState} from 'react';

import i18n from 'i18n-js';

import en from '~src/assets/translations/en';
import zhHant from '~src/assets/translations/zh-Hant';
import {LANG_EN} from '~src/constants/Constant';
import StorageService from '~src/services/StorageService';

i18n.fallbacks = true;
i18n.translations = {
  en: en,
  'zh-HK': zhHant,
  'zh-MO': zhHant,
  'zh-TW': zhHant,
  'zh-Hant': zhHant,
};

const LocalizationContext = React.createContext();

export const LocalizationContextProvider = props => {
  const [locale, setLocale] = useState('NOT_SET');

  const changeLocale = locale => {
    setLocale(locale);
    i18n.locale = locale;
    StorageService.setLocale(locale).then(() => {});
  };

  // json - the json from server
  // fieldName - the field you want to get, e.g. name
  const getField = (json, fieldName) => {
    let langPack = locale === LANG_EN ? 'EnUS' : 'ZhHK';
    let fieldValue = json[fieldName + langPack];
    return fieldValue ? fieldValue : '';
  };

  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale: changeLocale,
      getField: getField,
    }),
    [locale],
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
