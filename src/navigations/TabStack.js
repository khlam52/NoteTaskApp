import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppDefaultTheme } from '../contexts/theme/AppTheme';
import TempTestScreen from '../screens/TempTestScreen';
import Route from './Route';
import useLocalization from '~src/contexts/i18n';
// import useAppTheme from '~src/contexts/theme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const Tab = createBottomTabNavigator();

export const TabStack = (props) => {
  const insets = useSafeAreaInsets();
  const { locale, t } = useLocalization();

  const tab1Title = 'History';
  const tab2Title = 'Wishlist';
  const tab3Title = 'Home';
  const tab4Title = 'Message';
  const tab5Title = 'Profile';

  const TAB1 = 'TAB1';
  const TAB2 = 'TAB2';
  const TAB3 = 'TAB3';
  const TAB4 = 'TAB4';
  const TAB5 = 'TAB5';

  const theme = AppDefaultTheme.settings;

  const styles = getStyle(insets, theme);

  const getTabBarLabel = (focused, label) => {
    return (
      <Text
        style={
          focused ? styles.tabBarLabelFocused : styles.tabBarLabelNonFocused
        }>
        {label}
      </Text>
    );
  };

  const getTabBarProfileLabel = (focused, label) => {
    return (
      <View style={{ paddingBottom: sw(16) }}>
        <Text
          style={
            focused
              ? styles.tabBarProfileLabelFocused
              : styles.tabBarProfileLabelNonFocused
          }>
          {label}
        </Text>
      </View>
    );
  };

  // const getTabBarIcon = (focused, type) => {
  //   let icon;
  //   switch (type) {
  //     case TAB1:
  //       icon = <NavHistoryIcon fill={focused ? '#DAC9EF' : '#C4C4C4'} />;
  //       break;

  //     case TAB2:
  //       icon = <NavWishListIcon fill={focused ? '#DAC9EF' : '#C4C4C4'} />;
  //       break;

  //     case TAB3:
  //       icon = (
  //         <NavHomeIcon
  //           fill={focused ? '#DAC9EF' : '#C4C4C4'}
  //           stroke={focused ? '#DAC9EF' : '#C4C4C4'}
  //         />
  //       );
  //       break;

  //     case TAB4:
  //       icon = <NavMessageIcon fill={focused ? '#DAC9EF' : '#C4C4C4'} />;
  //       break;
  //     case TAB5:
  //       icon = <NavProfileIcon fill={focused ? '#DAC9EF' : '#C4C4C4'} />;
  //       break;

  //     default:
  //       break;
  //   }

  //   return type !== TAB3 ? (
  //     <View style={[styles.tabIconContainer]}>{icon}</View>
  //   ) : (
  //     <View style={[styles.circleView]}>{icon}</View>
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      {console.log('tab staclk now')}
      <Tab.Navigator
        initialRouteName={Route.TAB_STACK}
        backBehavior="initialRoute"
        shifting={false}
        tabBarVisible={false}
        // tabBar={(props) => <TabBar {...props} />}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          headerShown: false,
          tabBarActiveTintColor: '#357CB6',
          tabBarInactiveTintColor: '#6A7991',
          tabBarStyle: [
            {
              position: 'absolute',
              height: sw(102),
              borderTopRightRadius: sw(10),
              borderTopLeftRadius: sw(10),
              shadowOpacity: 0.8,
              shadowRadius: 10.0,
              shadowOffset: { 0: 15 },
              backgroundColor: '#352E41',
              borderTopWidth: 0,
              elevation: 50,
            },
            null,
          ],
        }}
        screenOptions={{
          headerShown: false,
          tarBarHideKeyboard: true,
          tabBarActiveTintColor: '#357CB6',
          tabBarInactiveTintColor: '#6A7991',
          tabBarStyle: [
            {
              position: 'absolute',
              height: sw(102),
              borderTopRightRadius: sw(10),
              borderTopLeftRadius: sw(10),
              shadowOpacity: 0.8,
              shadowRadius: 10.0,
              shadowOffset: { 0: 15 },
              backgroundColor: '#352E41',
              borderTopWidth: 0,
              elevation: 50,
            },
            null,
          ],
        }}>
        <Tab.Screen
          name={Route.TEMP_TEST_SCREEN}
          component={TempTestScreen}
          options={{
            tabBarLabel: ({ focused, color, size }) => {
              return getTabBarLabel(focused, tab2Title);
            },
            // tabBarIcon: ({ focused, color, size }) => {
            //   return getTabBarIcon(focused, TAB2);
            // },
          }}
          listeners={() => ({
            tabPress: (event) => {},
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
    tabBarLabelFocused: {
      ...Typography.ts(theme.fonts.weight.bold, theme.fonts.size.note2),
      color: '#DAC9EF',
      marginTop: sw(-13),
      marginBottom: Platform.OS === 'android' ? sw(20) : null,
    },
    tabBarLabelNonFocused: {
      ...Typography.ts(theme.fonts.weight.regular, theme.fonts.size.note2),
      color: '#C4C4C4',
      marginTop: sw(-13),
      marginBottom: Platform.OS === 'android' ? sw(20) : null,
    },
    tabBarProfileLabelFocused: {
      ...Typography.ts(theme.fonts.weight.bold, theme.fonts.size.para),
      color: '#DAC9EF',
      marginBottom: Platform.OS === 'android' ? sw(20) : null,
    },
    tabBarProfileLabelNonFocused: {
      ...Typography.ts(theme.fonts.weight.regular, theme.fonts.size.para),
      color: '#C4C4C4',
      marginBottom: Platform.OS === 'android' ? sw(20) : null,
    },
    circleView: {
      position: 'absolute',
      bottom: Platform.OS === 'android' ? sw(1) : sw(-3),
      width: sw(78),
      height: sw(78),
      backgroundColor: '#352E41',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: sw(39),
      borderBottomWidth: 0,
      shadowOpacity: 0.3,
      shadowRadius: 5.0,
      shadowOffset: { width: 0, height: -6 },
      elevation: 20,
    },
  });
};
