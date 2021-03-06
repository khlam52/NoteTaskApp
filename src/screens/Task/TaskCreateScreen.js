import React, { useState, useEffect } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  LayoutAnimation,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { TickIcon, UnTickIcon } from '../../assets/images';
import AppButton from '../../components/AppButton';
import AppPressable from '../../components/AppPressable';
import BaseHeader from '../../components/BaseHeader';
import StorageService from '../../services/StorageService';
import CommonUtil from '../../utils/CommonUtil';
import TaskHelper from '../../utils/TaskHelper';
import SubTaskDropDownSelectionView from './SubTaskDropDownSelectionView';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const TaskCreateScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState(null);

  const [inputDate, setInputDate] = useState(CommonUtil.getMomentToday());

  const [node, setNode] = useState(1);
  const [isItemExtendPressed, setIsItemExtendPressed] = useState(false);
  const [isSelectSubTask, setIsSelectSubTask] = useState(false);
  const [selectedSubTaskUnder, setSelectedSubTaskUnder] = useState(null);

  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);

  useEffect(() => {
    console.log('recentTaskList:', recentTaskList);
  }, []);

  useEffect(() => {
    if (!isSelectSubTask) {
      setSelectedSubTaskUnder(null);
    }
  }, [isSelectSubTask]);

  const onChangeTitle = (val) => {
    setInputTitle(val);
  };

  const onChangeContent = (val) => {
    setInputContent(val);
  };

  const onSubTaskUnderPressed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSelectSubTask(!isSelectSubTask);
  };

  const onCreateBtnPressed = async () => {
    let data = {
      title: inputTitle,
      content: inputContent,
      node:
        isSelectSubTask && selectedSubTaskUnder
          ? selectedSubTaskUnder.node + 1
          : 1,
      uid: uuidv4(),
      parentUid:
        isSelectSubTask && selectedSubTaskUnder
          ? selectedSubTaskUnder.uid
          : null,
      status: 'IN_PROGRESS',
      createAt: CommonUtil.getMomentDate(inputDate),
    };

    let newTaskList = recentTaskList;
    newTaskList.push(data);

    console.log('newTaskList:', newTaskList);
    StorageService.setTaskList(newTaskList);
    TaskHelper.getTaskList(loadRecentTaskList);

    if (isSelectSubTask && selectedSubTaskUnder) {
      await TaskHelper.reCorrectTaskListBySubtask(
        recentTaskList,
        loadRecentTaskList,
      );
    } else {
      await TaskHelper.reCorrectTaskList(recentTaskList, loadRecentTaskList);
    }

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader title={t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.TITLE')} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        enableOnAndroid={true}
        style={styles.container}>
        <TextInput
          value={inputTitle}
          onChangeText={onChangeTitle}
          placeholder={t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.INPUT_TITLE')}
          style={styles.inputTitleText}
          placeholderTextColor={'#B6B6B6'}
        />
        <Text style={styles.dateText}>
          {CommonUtil.getMomentDate(inputDate)}
        </Text>
        <View style={styles.contentView}>
          <TextInput
            value={inputContent}
            onChangeText={onChangeContent}
            placeholder={t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.ADD_DESC')}
            style={styles.inputContentText}
            multiline={true}
            placeholderTextColor={'#B6B6B6'}
          />
        </View>
        {recentTaskList.length !== 0 && (
          <View>
            <AppPressable onPress={onSubTaskUnderPressed}>
              <View style={styles.beSubtaskView}>
                {!isSelectSubTask ? (
                  <UnTickIcon
                    stroke={'#FFEAA1'}
                    width={sw(25)}
                    height={sw(25)}
                  />
                ) : (
                  <TickIcon fill={'#FFEAA1'} width={sw(25)} height={sw(25)} />
                )}
                <Text style={styles.beSubtaskText}>
                  {t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.BE_A_SUBTASK')}
                </Text>
              </View>
            </AppPressable>
            {isSelectSubTask && (
              <View style={styles.subTaskDropDownView}>
                <SubTaskDropDownSelectionView
                  selectedSubTaskUnder={selectedSubTaskUnder}
                  setSelectedSubTaskUnder={setSelectedSubTaskUnder}
                  setIsItemExtendPressed={setIsItemExtendPressed}
                  isItemExtendPressed={isItemExtendPressed}
                />
              </View>
            )}
          </View>
        )}

        <View
          style={{ ...styles.btnView, zIndex: isItemExtendPressed ? -1 : 100 }}>
          <AppButton
            text={t('BTTONS.CREATE')}
            onPress={onCreateBtnPressed}
            disabled={
              !inputTitle || (isSelectSubTask && !selectedSubTaskUnder)
                ? true
                : false
            }
          />
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
      paddingBottom: sw(90),
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
      marginBottom: sw(130),
      zIndex: -1,
    },
    beSubtaskView: {
      flexDirection: 'row',
      marginTop: sw(30),
    },
    beSubtaskText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(24)),
      color: '#FFEAA1',
      marginLeft: sw(18),
    },
    subTaskDropDownView: {
      alignItems: 'flex-end',
      marginTop: sw(20),
    },
  });
};

export default TaskCreateScreen;
