import React from 'react';

import { BlurView } from '@react-native-community/blur';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavNoteIcon, NavTaskIcon, PlusIcon } from '../assets/images';
import { AppDefaultTheme } from '../contexts/theme/AppTheme';
import Route from '~src/navigations/Route';
import { Colors } from '~src/styles';
import { sw } from '~src/styles/Mixins';

export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const theme = AppDefaultTheme.settings;

  const styles = getStyle(insets, { theme });

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const pathX = '357';
  const pathY = '675';
  const pathA = '689';
  const pathB = '706';

  const getTabBarIcon = (focused, route) => {
    let icon;
    switch (route) {
      case Route.TASK_SCREEN:
        icon = <NavTaskIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      case Route.HOME_SCREEN:
        icon = (
          <PlusIcon
            fill={focused ? '#FFF' : '#CCCCCC'}
            width={sw(50)}
            height={sw(50)}
          />
        );
        break;
      case Route.NOTE_SCREEN:
        icon = <NavNoteIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      default:
        break;
    }

    return <View style={{ alignSelf: 'center' }}>{icon}</View>;
  };

  return (
    <View style={styles.tabBarContainer}>
      <BlurView
        style={{
          position: 'absolute',
          bottom: 0,
          top: 0,
          right: 0,
          left: 0,
          borderTopRightRadius: sw(20),
          borderTopLeftRadius: sw(20),
          overflow: 'hidden',
          borderRadius: sw(20),
        }}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      {/* <Svg
        version="1.1"
        id="bottom-bar"
        x="0px"
        y="0px"
        width="100%"
        height="100"
        viewBox="0 0 1092 260"
        space="preserve">
        <Path
          stroke={'#373A50'}
          fill={'green'}
          d={`M30,60h${pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${pathY}.7,74.5,${pathA}.5,60,${pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
        />
      </Svg> */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.name}>
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}>
              <View
                style={[
                  styles.tabItemContainer,
                  {
                    backgroundColor: isFocused
                      ? Colors.opacity('#A1A1A1', 0.1)
                      : null,
                  },
                ]}>
                {getTabBarIcon(isFocused, route.name)}
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
  );
}

const getStyle = (insets, { theme, themeName }) => {
  return StyleSheet.create({
    tabBarContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      //   backgroundColor: '#3A3A3E99',
      paddingHorizontal: sw(30),
      justifyContent: 'space-between',
      height:
        insets.bottom > 0
          ? insets.bottom + sw(77)
          : sw(theme.spacings.s2) + sw(77),
      shadowOpacity: 0.1,
      shadowRadius: 4.0,
      paddingTop: sw(7),
      paddingBottom: insets.bottom > 0 ? insets.bottom : sw(theme.spacings.s2),
    },
    tabItemContainer: {
      width: sw(80),
      height: sw(80),
      borderRadius: sw(theme.roundness.corner),
      justifyContent: 'center',
    },
  });
};
