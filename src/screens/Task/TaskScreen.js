import React, { useEffect, useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  LayoutAnimation,
} from 'react-native';

import BaseHeader from '../../components/BaseHeader';
import StorageService from '../../services/StorageService';
import TaskHelper from '../../utils/TaskHelper';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import TaskItemView from '~src/screens/Task/TaskItemView';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const TaskScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);

  const [restructureTaskList, setRestructureTaskList] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     TaskHelper.restructureTaskListFunc(
  //       recentTaskList,
  //       restructureTaskList,
  //       setRestructureTaskList,
  //       loadRecentTaskList,
  //     );
  //   }, []),
  // );

  useEffect(() => {
    TaskHelper.restructureTaskListFunc(
      recentTaskList,
      restructureTaskList,
      setRestructureTaskList,
      loadRecentTaskList,
    );
  }, [recentTaskList]);

  const showAnimationView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderSectionHeader = ({ section: { groupName, data } }) => {
    let name = t('SCREENS.TASK_SCREEN.COMPLETED');
    if (groupName === 'In Progress') {
      name = t('SCREENS.TASK_SCREEN.IN_PROGRESS');
    }
    let Datalength = 0;
    data.map((item) => {
      let node = _.get(item, 'node', '');
      if (node === 1) {
        Datalength++;
      }
    });
    return (
      <View>
        <Text style={styles.groupNameText}>{name + Datalength}</Text>
      </View>
    );
  };

  const renderItem = ({ item, index, section: { groupName } }) => {
    showAnimationView();
    let isCompleted = groupName === 'Completed' ? true : false;

    const onTickIconPressed = async () => {
      isCompleted = !isCompleted;
      recentTaskList.map((selectedItem) => {
        // Parent Item
        if (selectedItem.uid === item.uid) {
          selectedItem.status =
            isCompleted === true ? 'COMPLETED' : 'IN_PROGRESS';
        }
      });
      await TaskHelper.reCorrectTaskList(recentTaskList, loadRecentTaskList);
    };

    return (
      <TaskItemView
        item={item}
        index={index}
        groupName={groupName}
        onTickIconPressed={onTickIconPressed}
        isCompleted={isCompleted}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>{t('SCREENS.TASK_SCREEN.TITLE')}</Text>

        <SectionList
          style={styles.sectionList}
          sections={restructureTaskList ? restructureTaskList : []}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  paddingBottom: sw(200),
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
    },
    text: {
      ...Typography.ts(theme.fonts.weight.bold, sw(45)),
      color: '#FFF',
      textAlign: 'center',
    },
    sectionList: {
      paddingTop: sw(36),
      marginHorizontal: sw(20),
    },
    groupNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      marginBottom: sw(20),
      paddingTop: sw(30),
    },
  });
};

export default TaskScreen;
