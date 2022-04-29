/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  DeleteIcon,
  TickIcon,
  UnTickIcon,
} from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { AppDefaultTheme } from '../../contexts/theme/AppTheme';
import Route from '../../navigations/Route';
import TaskHelper from '../../utils/TaskHelper';
import useAppContext from '~src/contexts/app';
import useLocalization from '~src/contexts/i18n';
import RootNavigation from '~src/navigations/RootNavigation';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

TaskItemView.defaultProps = {
  item: null,
  index: null,
  groupName: null,
  onTickIconPressed: () => {},
  isCompleted: false,
};

export default function TaskItemView({
  item,
  index,
  groupName,
  onTickIconPressed,
  isCompleted,
}) {
  const { t, locale, setLocale } = useLocalization();
  const { showLoading, hideLoading } = useAppContext();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme, locale);

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);
  const loadRecentTaskList = useStoreActions(
    (action) => action.user.loadRecentTaskList,
  );

  const onSwipeClose = useRef();

  const [isItemExtendPressed, setIsItemExtendPressed] = useState(false);

  const onItemExtendPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsItemExtendPressed(!isItemExtendPressed);
  };

  const onItemPressed = (selectedItem) => {
    RootNavigation.navigate(Route.TASK_EDIT_SCREEN, {
      selectedItem: selectedItem,
    });
  };

  // Delete Item Swipe Handle
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0.25, 0.7, 1],
    });
    return (
      <AppPressable
        onPress={async () => {
          await TaskHelper.deleteTaskFunc(
            recentTaskList,
            loadRecentTaskList,
            item,
            index,
          );
          onSwipeClose.current.close();
        }}>
        <Animated.View
          style={{
            ...styles.deleteBtnView,
            transform: [{ translateX: trans }],
          }}>
          <DeleteIcon />
        </Animated.View>
      </AppPressable>
    );
  };

  let node = _.get(item, 'node', '');
  return (
    node === 1 && (
      <View key={index}>
        <Swipeable
          renderRightActions={renderRightActions}
          ref={onSwipeClose}
          friction={2}
          key={index}>
          <AppPressable
            onPress={() => {
              onItemPressed(item);
            }}
            key={index}
            customDisabledStyle={{ opacity: 1 }}>
            <Animated.View key={index} style={styles.itemView}>
              <View style={styles.itemLeftRowView}>
                <AppPressable onPress={onTickIconPressed}>
                  {isCompleted ? (
                    <TickIcon fill={'#FFEAA1'} />
                  ) : (
                    <UnTickIcon stroke={'#FFEAA1'} />
                  )}
                </AppPressable>
                <Text style={styles.itemTitleText}>{item.title}</Text>
              </View>

              <AppPressable
                onPress={
                  item.subTask.length > 0
                    ? onItemExtendPress
                    : () => {
                        onItemPressed(item);
                      }
                }>
                {item.subTask.length > 0 ? (
                  !isItemExtendPressed ? (
                    <ArrowDownIcon fill={'#FFF'} />
                  ) : (
                    <ArrowUpIcon fill={'#FFF'} />
                  )
                ) : (
                  <ArrowRightIcon fill={'#FFF'} />
                )}
              </AppPressable>
            </Animated.View>
          </AppPressable>
        </Swipeable>

        {isItemExtendPressed &&
          item.subTask.length > 0 &&
          item.subTask.map((subItem, subIndex) => {
            let isSubTaskCompleted =
              subItem.status === 'IN_PROGRESS' ? false : true;

            const onSubTickIconPressed = async () => {
              isSubTaskCompleted = !isSubTaskCompleted;
              // Subitem itself
              recentTaskList.map((selectedItem) => {
                if (selectedItem.uid === subItem.uid) {
                  selectedItem.status =
                    isSubTaskCompleted === true ? 'COMPLETED' : 'IN_PROGRESS';
                }
              });
              await TaskHelper.reCorrectTaskListBySubtask(
                recentTaskList,
                loadRecentTaskList,
              );
            };

            // Delete SubItem Swipe Handle
            const renderSubItemRightActions = (progress, dragX) => {
              const trans = dragX.interpolate({
                inputRange: [0, 50, 100, 101],
                outputRange: [0, 0.25, 0.7, 1],
              });
              return (
                <AppPressable
                  onPress={async () => {
                    await TaskHelper.deleteTaskFunc(
                      recentTaskList,
                      loadRecentTaskList,
                      subItem,
                      subIndex,
                      true,
                    );
                    onSwipeClose.current.close();
                  }}>
                  <Animated.View
                    style={{
                      ...styles.subItemDeleteBtnView,
                      transform: [{ translateX: trans }],
                    }}>
                    <DeleteIcon />
                  </Animated.View>
                </AppPressable>
              );
            };

            return (
              <Swipeable
                renderRightActions={renderSubItemRightActions}
                ref={onSwipeClose}
                friction={2}
                key={subIndex}>
                <AppPressable
                  onPress={() => {
                    onItemPressed(subItem);
                  }}
                  key={subIndex}
                  customDisabledStyle={{ opacity: 1 }}>
                  <View
                    key={subIndex}
                    style={{ ...styles.itemView, marginLeft: sw(46) }}>
                    <View style={styles.itemLeftRowView}>
                      <AppPressable onPress={onSubTickIconPressed}>
                        {isSubTaskCompleted ? (
                          <TickIcon
                            fill={'#D3FFB8'}
                            width={sw(25)}
                            height={sw(25)}
                          />
                        ) : (
                          <UnTickIcon
                            stroke={'#D3FFB8'}
                            width={sw(25)}
                            height={sw(25)}
                          />
                        )}
                      </AppPressable>
                      <Text style={styles.itemTitleText}>{subItem.title}</Text>
                    </View>
                    <ArrowRightIcon fill={'#FFF'} />
                  </View>
                </AppPressable>
              </Swipeable>
            );
          })}
      </View>
    )
  );
}

const getStyle = (theme, locale) => {
  return StyleSheet.create({
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
    itemTitleText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(16)),
      color: '#FFF',
      paddingLeft: sw(18),
    },
    deleteBtnView: {
      paddingHorizontal: sw(30),
      paddingVertical: sw(17),
      backgroundColor: '#2A2A32',
      borderRadius: sw(20),
      marginLeft: sw(8),
    },
    subItemDeleteBtnView: {
      paddingHorizontal: sw(30),
      paddingVertical: sw(13),
      backgroundColor: '#2A2A32',
      borderRadius: sw(20),
      marginLeft: sw(8),
    },
  });
};
