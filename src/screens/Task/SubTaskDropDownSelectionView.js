/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { useStoreState } from 'easy-peasy';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  ScrollView,
} from 'react-native';

import { ArrowDownIcon, ArrowUpIcon } from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { AppDefaultTheme } from '../../contexts/theme/AppTheme';
import useAppContext from '~src/contexts/app';
import useLocalization from '~src/contexts/i18n';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

SubTaskDropDownSelectionView.defaultProps = {
  setSelectedSubTaskUnder: () => {},
  selectedSubTaskUnder: null,
  setIsItemExtendPressed: () => {},
  isItemExtendPressed: null,
  selecteduid: null,
};

export default function SubTaskDropDownSelectionView({
  setSelectedSubTaskUnder,
  selectedSubTaskUnder,
  setIsItemExtendPressed,
  isItemExtendPressed,
  selecteduid,
}) {
  const { t, locale, setLocale } = useLocalization();
  const { showLoading, hideLoading } = useAppContext();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const recentTaskList = useStoreState((state) => state.user.recentTaskList);

  useEffect(() => {
    console.log('recentTaskList in subtask:', recentTaskList);
  }, []);

  const onItemExtendPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsItemExtendPressed(!isItemExtendPressed);
  };

  const onDropDownItemPressed = (item) => {
    setSelectedSubTaskUnder(item);
    setIsItemExtendPressed(!isItemExtendPressed);
  };

  const renderSelectTaskView = () => {
    return recentTaskList.map((item, index) => {
      return (
        selecteduid !== item.uid &&
        item.node === 1 && (
          <AppPressable
            onPress={() => {
              onDropDownItemPressed(item);
            }}>
            <View
              style={{
                ...styles.listItemView,
              }}
              key={index}>
              <Text style={styles.taskText}>{item.title}</Text>
            </View>
          </AppPressable>
        )
      );
    });
  };

  return (
    <View style={styles.container}>
      <AppPressable onPress={onItemExtendPress}>
        <View
          style={{
            ...styles.beSubtaskView,
            borderRadius: !isItemExtendPressed ? sw(20) : null,
            borderTopLeftRadius: isItemExtendPressed ? sw(20) : null,
            borderTopRightRadius: isItemExtendPressed ? sw(20) : null,
          }}>
          <Text style={styles.taskText}>
            {selectedSubTaskUnder
              ? selectedSubTaskUnder.title
              : '-- under which task --'}
          </Text>
          {!isItemExtendPressed ? (
            <ArrowDownIcon fill={'#FFEAA1'} />
          ) : (
            <ArrowUpIcon fill={'#FFEAA1'} />
          )}
        </View>
      </AppPressable>
      <ScrollView
        style={{
          maxHeight: sw(150),
          borderBottomLeftRadius: sw(20),
          borderBottomRightRadius: sw(20),
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {isItemExtendPressed && renderSelectTaskView()}
      </ScrollView>
    </View>
  );
}

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 1,
      paddingBottom: sw(90),
    },
    beSubtaskView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424450',
      paddingHorizontal: sw(20),
      paddingVertical: sw(14),
      justifyContent: 'space-between',
      width: sw(311),
    },
    taskText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(18)),
      color: '#FFEAA1',
    },
    listItemView: {
      backgroundColor: '#424450',
      paddingHorizontal: sw(20),
      paddingVertical: sw(14),
      justifyContent: 'space-between',
      width: sw(311),
      borderTopColor: '#B6B6B6',
      borderTopWidth: sw(0.5),
    },
  });
};
