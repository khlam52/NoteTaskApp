/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import i18n from 'i18n-js';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as RNLocalize from 'react-native-localize';

import { SplashIcon } from '../../assets/images';
import { LANG_EN, LANG_TC } from '~src/constants/Constant';
import useAppContext from '~src/contexts/app';
import useLocalization from '~src/contexts/i18n';
import useAppTheme from '~src/contexts/theme';
import StorageService from '~src/services/StorageService';
import { sh } from '~src/styles/Mixins';
import { sw } from '~src/styles/Mixins';
import Route from '../../navigations/Route';

export default function SplashScreen({ navigation }) {
  const { locale, setLocale, t } = useLocalization();
  const { theme, setTheme } = useAppTheme();
  const { showLoading, hideLoading } = useAppContext();
  const styles = getStyle();

  const appState = useStoreState((state) => state.appState);

  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const loadRecentNoteList = useStoreActions(
    (action) => action.user.loadRecentNoteList,
  );

  useEffect(() => {
    console.log('SplashScreen -> useEffect');

    if (appState.isFirstOpen) {
      loadData();
    }
  }, []);

  const goNextPage = async () => {
    navigation.navigate(Route.MAIN_STACK, { screen: Route.TAB_STACK });
  };

  const loadData = async () => {
    console.log('SplashScreen -> loadData -> locale: ', locale);
    console.log('SplashScreen -> loadData -> i18n.locale: ', i18n.locale);
    await setDefaultLocale();
    await loadSavedAppValue();

    // Get Task List
    let taskList = await StorageService.getTaskList();
    loadRecentTaskList(taskList);

    // Get Note List
    let noteList = await StorageService.getNoteList();
    loadRecentNoteList(noteList);

    goNextPage();

    // initAppData()
    //   .then(() => {
    //     console.log('SplashScreen -> initAppData -> success');
    //     goNextPage();
    //   })
    //   .catch((error) => {
    //     // ErrorUtil.showApiErrorMsgAlert(error, CommonUtil.exitApp);
    //     alert('SplashScreen -> initAppData -> error');
    //     console.log('SplashScreen -> initAppData -> error: ', error);
    //   });
  };

  //   const initAppData = async () => {
  //     // 1. Create session
  //     try {
  //       return await AppInitService.initAppData();
  //     } catch (error) {
  //       return Promise.reject(error);
  //     }
  //   };

  const setDefaultLocale = async () => {
    // first time open app, load value from device os lang
    let savedLocale = await StorageService.getLocale();
    if (savedLocale) {
      if (savedLocale) {
        console.log(
          'SplashScreen -> setDefaultLanguage -> not first launch -> savedLocale:',
          savedLocale,
        );
        setLocale(savedLocale);
        return savedLocale;
      }
    } else {
      const deviceLocales = RNLocalize.getLocales();
      console.log(
        'SplashScreen -> setDefaultLocale -> first launch -> RNLocalize.getLocales:',
        deviceLocales,
      );
      if (Array.isArray(deviceLocales)) {
        let languageTag = deviceLocales[0].languageTag;
        let defaultLocale = LANG_EN;
        if (
          languageTag.indexOf('zh-HK') !== -1 ||
          languageTag.indexOf('zh-MO') !== -1 ||
          languageTag.indexOf('zh-TW') !== -1 ||
          languageTag.indexOf('zh-Hant') !== -1 ||
          languageTag.indexOf('zh-CN') !== -1 ||
          languageTag.indexOf('zh-Hans') !== -1
        ) {
          defaultLocale = LANG_TC;
        }

        setLocale(defaultLocale);
        return defaultLocale;
      }
    }
  };

  const loadSavedAppValue = async () => {};

  return (
    <View style={styles.container}>
      <View style={{ ...styles.bgPatternView }}>
        <LinearGradient
          colors={['#0B0B0BCF', '#000000']}
          style={styles.bgPatternFill}
        />
      </View>
      <View style={styles.imageBackground}>
        <SplashIcon />
      </View>
    </View>
  );
}

const getStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    bgPatternView: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
    imageBackground: {
      marginTop: sh(226),
    },
    bgPatternFill: {
      width: '100%',
      height: '100%',
    },
  });
};
