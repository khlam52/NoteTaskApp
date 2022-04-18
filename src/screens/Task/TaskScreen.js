import React, { useEffect, useState, useCallback } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import _ from 'lodash';
import { StyleSheet, Text, View, SectionList } from 'react-native';

import BaseHeader from '../../components/BaseHeader';
import StorageService from '../../services/StorageService';
import TaskItemView from './TaskItemView';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
import { useFocusEffect } from '@react-navigation/core';

const TaskScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);

  const [restructureTaskList, setRestructureTaskList] = useState([]);

  let TaskList = [
    {
      groupName: 'Completed',
      data: [
        {
          title: 'Completed task 1',
          node: 1,
          subTask: [],
        },
        {
          title: 'Completed task 2',
          node: 1,
          subTask: ['Completed task 2.1', 'Completed task 2.2'],
        },
        {
          title: 'Completed task 2.1',
          node: 2,
          subTask: ['Completed task 2.1.1', 'Completed task 2.1.2'],
        },
        {
          title: 'Completed task 2.2',
          node: 2,
          subTask: ['Completed task 2.2.1'],
        },
        {
          title: 'Completed task 2.1.1',
          node: 3,
          subTask: [],
        },
        {
          title: 'Completed task 2.1.2',
          node: 3,
          subTask: [],
        },
        {
          title: 'Completed task 2.2.1',
          node: 3,
          subTask: [],
        },
      ],
    },
    {
      groupName: 'In Progress',
      data: [
        {
          title: 'In Progress task 1',
          node: 1,
          subTask: [],
        },
        {
          title: 'In Progress task 2',
          node: 1,
          subTask: [],
        },
        {
          title: 'In Progress task 3',
          node: 1,
          subTask: ['In Progress task 3.1', 'In Progress task 3.2'],
        },
        {
          title: 'In Progress task 3.1',
          node: 2,
          subTask: [],
        },
        {
          title: 'In Progress task 3.2',
          node: 2,
          subTask: ['In Progress task 3.2.1'],
        },
        {
          title: 'In Progress task 3.2.1',
          node: 3,
          subTask: [],
        },
        {
          title: 'In Progress task 4',
          node: 1,
          subTask: [],
        },
      ],
    },
  ];

  useFocusEffect(
    useCallback(() => {
      getTaskList();
      restructureTaskListFunc();
    }, []),
  );

  const restructureTaskListFunc = () => {
    let completedList = [];
    let inProgressList = [];
    recentTaskList.map((item, index) => {
      let parentUid = item.parentUid;
      let status = item.status;
      let subTaskList = [];
      let subTaskArray = [];

      if (item.node === 1) {
        subTaskList = _.filter(recentTaskList, { parentUid: item.uid });
      }
      console.log('subTaskList:', subTaskList);
      subTaskList.map((item) => {
        subTaskArray.push(item.title);
      });
      let data = {
        title: item.title,
        node: item.node,
        subTask: subTaskArray,
      };
      if (status === 'IN_PROGRESS') {
        inProgressList.push(data);
      } else {
        completedList.push(data);
      }
    });
    console.log('completedList:', completedList, inProgressList);
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
  };

  const getTaskList = async () => {
    try {
      let response = await StorageService.getTaskList();
      console.log('response:', response);
      loadRecentTaskList(response);
      console.log('recentTaskList:', recentTaskList);
    } catch (error) {
      console.log('error->:', error);
    }
  };

  const renderSectionHeader = ({ section: { groupName, data } }) => {
    let Datalength = 0;
    data.map((item) => {
      let node = _.get(item, 'node', '');
      if (node === 1) {
        Datalength++;
      }
    });
    return (
      <View>
        <Text style={styles.groupNameText}>
          {groupName + ' - ' + Datalength}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, index, section: { groupName } }) => {
    return <TaskItemView item={item} index={index} groupName={groupName} />;
  };

  const noResultScreen = () => (
    <View style={{ alignItems: 'center', marginTop: sw(150) }}>
      <Text style={styles.infoText}>No Result !</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Tasks</Text>

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
          ListEmptyComponent={noResultScreen}
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
    settingView: {
      marginTop: sw(12),
      marginRight: sw(40),
      marginBottom: sw(20),
      alignSelf: 'flex-end',
    },
    sectionList: {
      marginHorizontal: sw(20),
    },
    groupNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      marginBottom: sw(20),
      paddingTop: sw(30),
    },
    itemTitleText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(16)),
      color: '#FFF',
      paddingLeft: sw(18),
    },
    itemView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424450',
      borderRadius: sw(20),
      justifyContent: 'space-between',
      paddingHorizontal: sw(16),
      paddingVertical: sw(12),
      marginBottom: sw(12),
    },
    itemLeftRowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export default TaskScreen;
