import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
  Image,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavNoteIcon, NavPlusIcon, NavTaskIcon } from '../assets/images';
import { AppDefaultTheme } from '../contexts/theme/AppTheme';
import Route from './Route';
import useLocalization from '~src/contexts/i18n';
// import useAppTheme from '~src/contexts/theme';
import { sw } from '~src/styles/Mixins';
import { BlurView } from '@react-native-community/blur';
import { Typography } from '~src/styles';
import NoteScreen from '../screens/Note/NoteScreen';
import TaskScreen from '../screens/Task/TaskScreen';
import HomeScreen from '../screens/Common/HomeScreen';

const Tab = createBottomTabNavigator();

export const TabStack = (props) => {
  const insets = useSafeAreaInsets();
  const { locale, t } = useLocalization();

  const TAB1 = 'TAB1';
  const TAB2 = 'TAB2';
  const TAB3 = 'TAB3';

  const theme = AppDefaultTheme.settings;

  const styles = getStyle(insets, theme);

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {getTabBarIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const getTabBarIcon = (routeName, selectedTab) => {
    let icon;
    switch (routeName) {
      case Route.TASK_SCREEN:
        icon = (
          <NavTaskIcon fill={selectedTab !== routeName ? '#CCCCCC' : '#FFF'} />
        );
        break;
      case Route.NOTE_SCREEN:
        icon = (
          <NavNoteIcon fill={selectedTab !== routeName ? '#CCCCCC' : '#FFF'} />
        );
        break;
      default:
        break;
    }
    return <View style={[styles.tabIconContainer]}>{icon}</View>;
  };

  return (
    <View style={{ flex: 1 }}>
      {console.log('tab staclk now')}
      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        strokeWidth={0}
        height={sw(106)}
        circleWidth={sw(50)}
        bgColor="#3A3A3E99"
        initialRouteName={Route.HOME_SCREEN}
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={() => navigate(Route.HOME_SCREEN)}>
              <NavPlusIcon />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name={Route.TASK_SCREEN}
          position="left"
          component={TaskScreen}
        />
        <CurvedBottomBar.Screen
          name={Route.HOME_SCREEN}
          component={HomeScreen}
          position="center"
        />
        <CurvedBottomBar.Screen
          name={Route.NOTE_SCREEN}
          component={NoteScreen}
          position="right"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

const getStyle = (insets, theme) => {
  return StyleSheet.create({
    tabIconContainer: {
      width: sw(42),
      height: 38,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnCircle: {
      width: 0,
      height: 0,
      alignItems: 'center',
      justifyContent: 'center',
      padding: sw(10),
      bottom: sw(10),
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    roundImage: {
      height: 200,
      width: 200,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    roundImageBackground: {
      backgroundColor: 'white',
      height: 300,
      width: 300,
      borderRadius: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
