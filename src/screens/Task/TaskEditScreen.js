import React, { useState, useEffect } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  LayoutAnimation,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 'react-native-get-random-values';

import { TickIcon, UnTickIcon } from '../../assets/images';
import AppButton from '../../components/AppButton';
import AppPressable from '../../components/AppPressable';
import BaseHeader from '../../components/BaseHeader';
import CommonUtil from '../../utils/CommonUtil';
import TaskHelper from '../../utils/TaskHelper';
import SubTaskDropDownSelectionView from './SubTaskDropDownSelectionView';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const TaskEditScreen = ({ navigation, route }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);

  const selectedItem = _.get(route, 'params.selectedItem', []);

  let selectedTitle = _.get(selectedItem, 'title', '');
  let selectedContent = _.get(selectedItem, 'content', '');
  let selectedStatus = _.get(selectedItem, 'status', '');
  let selectedSubTaskList = _.get(selectedItem, 'subTask', '');
  let selectedParentUid = _.get(selectedItem, 'parentUid', '');
  let selecteduid = _.get(selectedItem, 'uid', '');
  let selectedNode = _.get(selectedItem, 'node', '');
  let selectedCreateDate = _.get(selectedItem, 'createAt', '');

  const [inputTitle, setInputTitle] = useState(selectedTitle);
  const [inputContent, setInputContent] = useState(selectedContent);

  const [inputDate, setInputDate] = useState(selectedCreateDate);

  const [node, setNode] = useState(selectedNode);
  const [isItemExtendPressed, setIsItemExtendPressed] = useState(false);
  const [isSelectSubTask, setIsSelectSubTask] = useState(
    selectedNode === 1 ? false : true,
  );
  const [isCompleted, setIsCompleted] = useState(
    selectedStatus === 'COMPLETED' ? true : false,
  );
  const [selectedSubTaskUnder, setSelectedSubTaskUnder] = useState(
    _.filter(recentTaskList, { uid: selectedParentUid })[0],
  );

  useEffect(() => {
    console.log('recentTaskList:', recentTaskList);
    console.log('selectedItem:', selectedItem);
  }, []);

  useEffect(() => {
    if (!isSelectSubTask) {
      setSelectedSubTaskUnder(null);
    } else if (isSelectSubTask) {
      setNode(2);
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

  const onCompletedPressed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCompleted(!isCompleted);
  };

  const onDoneBtnPressed = async () => {
    recentTaskList.map((item, index) => {
      if (item.uid === selecteduid) {
        item.title = inputTitle;
        item.content = inputContent;
        item.node =
          isSelectSubTask && selectedSubTaskUnder
            ? selectedSubTaskUnder.node + 1
            : 1;
        item.parentUid =
          isSelectSubTask && selectedSubTaskUnder
            ? selectedSubTaskUnder.uid
            : null;
        item.status = isCompleted ? 'COMPLETED' : 'IN_PROGRESS';
        item.createAt = CommonUtil.getMomentDate(CommonUtil.getMomentToday());
      }
    });
    if (node === 1) {
      await TaskHelper.reCorrectTaskList(recentTaskList, loadRecentTaskList);
    } else {
      await TaskHelper.reCorrectTaskListBySubtask(
        recentTaskList,
        loadRecentTaskList,
      );
    }

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader title={t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.EDIT_TITLE')} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        style={styles.container}>
        <TextInput
          value={inputTitle}
          onChangeText={onChangeTitle}
          placeholder={t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.INPUT_TITLE')}
          style={styles.inputTitleText}
          placeholderTextColor={'#B6B6B6'}
        />
        <Text style={styles.dateText}>
          {TaskHelper.getZhhkTimeFormat(inputDate, locale)}
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
        <AppPressable onPress={onCompletedPressed}>
          <View style={styles.beSubtaskView}>
            {!isCompleted ? (
              <UnTickIcon stroke={'#FFEAA1'} width={sw(25)} height={sw(25)} />
            ) : (
              <TickIcon fill={'#FFEAA1'} width={sw(25)} height={sw(25)} />
            )}
            <Text style={styles.beSubtaskText}>
              {t('SCREENS.TASK_CREATE_AND_EDIT_SCREEN.COMPLETED')}
            </Text>
          </View>
        </AppPressable>
        {recentTaskList.length > 1 && (
          <View>
            <AppPressable
              onPress={onSubTaskUnderPressed}
              disabled={selectedSubTaskList.length === 0 ? false : true}>
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
                  selecteduid={selecteduid}
                />
              </View>
            )}
          </View>
        )}
        <View
          style={{ ...styles.btnView, zIndex: isItemExtendPressed ? -1 : 100 }}>
          <AppButton
            text={t('BTTONS.DONE')}
            onPress={onDoneBtnPressed}
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

export default TaskEditScreen;
