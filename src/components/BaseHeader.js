/* eslint-disable react/prop-types */
import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  NativeModules,
  Platform,
} from 'react-native';
// import { Platform, Text, TextInput, View, StyleSheet } from 'react-native';

import { BackIcon } from '../assets/images';
import { AppDefaultTheme } from '../contexts/theme/AppTheme';
import AppFocusAwareStatusBar from './AppFocusAwareStatusBar';
// import { withAllContext } from '~src/contexts/withAllContext';
import AppPressable from './AppPressable';
import RootNavigation from '~src/navigations/RootNavigation';
import { Typography } from '~src/styles';
// import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
// import CommonUtil from '~src/utils/CommonUtil';

const BaseHeader = ({
  title,
  leftElement,
  rightElement,
  isTransparent,
  additionalStyle,
  onBackButtonPressed,
  isBackgroundTransparent,
  ...props
}) => {
  const theme = AppDefaultTheme.settings;
  console.log('BaseHeader -> isTransparent : ', isTransparent);
  const styles = getStyle(theme, { ...props, isTransparent: isTransparent });
  const headerBackgroundColor = '#1B191E';

  const headerTextColor = '#FFF';
  return (
    <View
      onLayout={props.onLayoutEvent !== undefined ? props.onLayoutEvent : null}
      style={{
        ...(additionalStyle !== undefined ? additionalStyle : null),
      }}>
      {!isTransparent && (
        <AppFocusAwareStatusBar
          barStyle={
            'light-content'
            // CommonUtil.getColorBrightness(headerBackgroundColor) > 150
            //   ? 'dark-content'
            //   : 'light-content'
          }
          backgroundColor={
            props.backgroundColor
              ? props.backgroundColor
              : theme.colors.supportive
          }
          animated={false}
        />
      )}
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: headerBackgroundColor,
          },
        ]}>
        {/* <StatusBar animated={true} backgroundColor={theme.colors.supportive} /> */}
        <View style={styles.container}>
          <View style={[styles.sideElementContainer, styles.sideLeft]}>
            {leftElement ? (
              leftElement
            ) : props.notShowBackIcon ? null : (
              <AppPressable
                onPress={
                  onBackButtonPressed
                    ? onBackButtonPressed
                    : RootNavigation.back
                }>
                <BackIcon />
              </AppPressable>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={props.secondTitle ? 1 : 2}
              ellipsizeMode={'tail'}
              style={[
                styles.titleText,
                {
                  color: headerTextColor,
                },
              ]}>
              {title ? title : ''}
            </Text>
            {props.secondTitle ? (
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.subTitleText}>
                {props.secondTitle ? props.secondTitle : ''}
              </Text>
            ) : null}
          </View>
          <View style={[styles.sideElementContainer, styles.sideRight]}>
            {rightElement ? rightElement : null}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const getStyle = (theme, props) => {
  // console.log('BaseHeader -> getStyle : ', theme);
  const { StatusBarManager } = NativeModules;
  return StyleSheet.create({
    safeArea: {},
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: sw(28),
      paddingTop: sw(12),
      paddingBottom: sw(18),
      ...(!props.isTransparent && Platform.OS === 'android'
        ? { marginTop: StatusBarManager.HEIGHT }
        : null),
    },
    titleContainer: {
      flex: 1,
      paddingHorizontal: sw(16),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      ...Typography.ts(theme.fonts.weight.bold, theme.fonts.size.lead),
      textAlign: 'center',
    },
    subTitleText: {
      ...Typography.ts(theme.fonts.weight.light, theme.fonts.size.desc),
      textAlign: 'center',
      color: '#B6B6B6',
      paddingTop: sw(6),
    },
    sideElementContainer: {
      minWidth: sw(theme.spacings.s5),
      // backgroundColor: '#CC0023AC',
    },
    sideLeft: {
      // marginLeft: sw(theme.spacings.s2),
      alignItems: 'flex-start',
    },
    sideRight: {
      // marginRight: sw(theme.spacings.s3),
      alignItems: 'flex-end',
    },
  });
};

export default BaseHeader;
