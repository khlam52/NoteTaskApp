import React from 'react';

import BlurView from '@react-native-community/blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavNoteIcon, NavPlusIcon, NavTaskIcon } from '../assets/images';
import { AppDefaultTheme } from '../contexts/theme/AppTheme';
import HomeScreen from '../screens/Common/HomeScreen';
import NoteScreen from '../screens/Note/NoteScreen';
import TaskScreen from '../screens/Task/TaskScreen';
import Route from './Route';
import useAppContext from '~src/contexts/app';
import useLocalization from '~src/contexts/i18n';
// import useAppTheme from '~src/contexts/theme';
import { sw } from '~src/styles/Mixins';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

export const TabStack = (props) => {
  const insets = useSafeAreaInsets();
  const { locale, t } = useLocalization();
  const { showLoading, hideLoading } = useAppContext();

  const TAB1 = 'TAB1';
  const TAB2 = 'TAB2';
  const TAB3 = 'TAB3';

  const theme = AppDefaultTheme.settings;

  const styles = getStyle(insets, theme);

  const getTabBarIcon = (focused, type) => {
    let icon;
    switch (type) {
      case TAB1:
        icon = <NavTaskIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      case TAB2:
        icon = <NavPlusIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      case TAB3:
        icon = <NavNoteIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      default:
        break;
    }

    return <View style={[styles.tabIconContainer]}>{icon}</View>;
  };

  return (
    <View style={{ flex: 1 }}>
      {console.log('tab staclk now')}
      <Tab.Navigator
        initialRouteName={Route.TASK_SCREEN}
        backBehavior="initialRoute"
        shifting={false}
        tabBarVisible={false}
        tabBar={(props) => <TabBar {...props} />}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          headerShown: false,
        }}
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tarBarHideKeyboard: true,
        }}>
        <Tab.Screen
          name={Route.TASK_SCREEN}
          component={TaskScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return getTabBarIcon(focused, TAB1);
            },
          }}
          listeners={() => ({
            tabPress: async (event) => {},
          })}
        />
        <Tab.Screen
          name={Route.HOME_SCREEN}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return getTabBarIcon(focused, TAB2);
            },
          }}
          listeners={() => ({
            tabPress: async (event) => {},
          })}
        />
        <Tab.Screen
          name={Route.NOTE_SCREEN}
          component={NoteScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return getTabBarIcon(focused, TAB3);
            },
          }}
          listeners={() => ({
            tabPress: async (event) => {},
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

const getStyle = (insets, theme) => {
  return StyleSheet.create({
    tabIconContainer: {
      width: 42,
      height: 38,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
