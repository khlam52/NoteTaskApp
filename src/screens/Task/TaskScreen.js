import React from 'react';

import { StyleSheet, Text, View, SectionList } from 'react-native';

import { SettingIcon } from '../../assets/images';
import BaseHeader from '../../components/BaseHeader';
import TaskItemView from './TaskItemView';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const TaskScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  let TaskList = [
    {
      groupName: 'Completed',
      data: [
        {
          title: 'Completed task 1',
          subTask: [],
        },
        {
          title: 'Completed task 2',
          subTask: ['Completed task 2.1', 'Completed task 2.2'],
        },
      ],
    },
    {
      groupName: 'In Progress',
      data: [
        {
          title: 'In Progress task 1',
          subTask: [],
        },
        {
          title: 'In Progress task 2',
          subTask: [],
        },
        {
          title: 'In Progress task 3',
          subTask: ['In Progress task 3.1', 'In Progress task 3.2'],
        },
        {
          title: 'In Progress task 4',
          subTask: [],
        },
      ],
    },
  ];

  const renderSectionHeader = ({ section: { groupName, data } }) => {
    return (
      <View>
        <Text style={styles.groupNameText}>
          {groupName + ' - ' + data.length}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, index, section: { groupName } }) => {
    return <TaskItemView item={item} index={index} groupName={groupName} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Tasks</Text>

        <SectionList
          style={styles.sectionList}
          sections={TaskList}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
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
