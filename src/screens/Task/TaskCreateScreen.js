import React, { useState, useEffect } from 'react';

import { StyleSheet, View, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppButton from '../../components/AppButton';
import BaseHeader from '../../components/BaseHeader';
import CommonUtil from '../../utils/CommonUtil';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
import { TickIcon } from '../../assets/images';
import { v4 as uuidv4 } from 'uuid';
import StorageService from '../../services/StorageService';
import { useStoreActions, useStoreState } from 'easy-peasy';

const TaskCreateScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState(null);

  const [inputDate, setInputDate] = useState(CommonUtil.getMomentToday());

  const [node, setNode] = useState(1);

  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);

  useEffect(() => {
    console.log('uuid:', uuidv4());
    // getTaskList();
  }, []);

  const onChangeTitle = (val) => {
    setInputTitle(val);
  };

  const onChangeContent = (val) => {
    setInputContent(val);
  };

  const getTaskList = async () => {
    try {
      let response = await StorageService.getTaskList();
      loadRecentTaskList(response);
      console.log('recentTaskList:', recentTaskList);
    } catch (error) {
      console.log('error->:', error);
    }
  };

  const onCreateBtnPressed = () => {
    let data = {
      title: inputTitle,
      content: inputContent,
      node: node,
      uid: uuidv4(),
      parentUid: null,
      status: 'IN_PROGRESS',
    };

    let newTaskList = recentTaskList;
    newTaskList.push(data);

    console.log('newTaskList:', newTaskList);
    StorageService.setTaskList(newTaskList);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader title={'Create Task'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        style={styles.container}>
        <TextInput
          value={inputTitle}
          onChangeText={onChangeTitle}
          placeholder={'Input Task Title'}
          style={styles.inputTitleText}
        />
        <Text style={styles.dateText}>
          {CommonUtil.getMomentDate(inputDate)}
        </Text>
        <View style={styles.contentView}>
          <TextInput
            value={inputContent}
            onChangeText={onChangeContent}
            placeholder={'Add description...'}
            style={styles.inputContentText}
            multiline={true}
            placeholderTextColor={'#B6B6B6'}
          />
        </View>
        <View style={styles.btnView}>
          <AppButton text={'Create'} onPress={onCreateBtnPressed} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
      paddingTop: sw(50),
      paddingHorizontal: sw(30),
    },
    text: {
      ...Typography.ts(theme.fonts.weight.bold, sw(45)),
      color: '#FFF',
      textAlign: 'center',
    },
    inputTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(30)),
      color: '#FFF',
    },
    dateText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(18)),
      color: '#B6B6B6',
      marginTop: sw(36),
    },
    inputContentText: {
      ...Typography.ts(theme.fonts.weight.light, sw(18)),
      color: '#B6B6B6',
      lineHeight: sw(25),
    },
    contentView: {
      borderBottomColor: '#FFF',
      borderTopColor: '#FFF',
      borderTopWidth: sw(0.5),
      borderBottomWidth: sw(0.5),
      paddingVertical: sw(18),
      marginTop: sw(28),
      height: sw(230),
    },
    btnView: {
      alignItems: 'center',
      marginTop: sw(116),
    },
  });
};

export default TaskCreateScreen;
