import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';

import HomeScreen from '../screens/Common/HomeScreen';
import SplashScreen from '../screens/Common/SplashScreen';
import CreateAndEditNoteScreen from '../screens/Note/CreateAndEditNoteScreen';
import NoteScreen from '../screens/Note/NoteScreen';
import TaskCreateScreen from '../screens/Task/TaskCreateScreen';
import TaskEditScreen from '../screens/Task/TaskEditScreen';
import TaskScreen from '../screens/Task/TaskScreen';
import Route from './Route';
import { TabStack } from './TabStack';
import useAppContext from '~src/contexts/app';

const Stack = createStackNavigator();
let deviceBrand = DeviceInfo.getBrand();

// Define multiple groups of screens in objects like this
const commonScreens = {};
commonScreens[Route.TASK_CREATE_SCREEN] = TaskCreateScreen;
commonScreens[Route.TASK_EDIT_SCREEN] = TaskEditScreen;
commonScreens[Route.CREATE_AND_EDIT_NOTE_SCREEN] = CreateAndEditNoteScreen;

// One time launch screns
const launchScreens = {};
launchScreens[Route.SPLASH_SCREEN] = SplashScreen;

// Pre login Screens
const authScreens = {};

// Post login Screens
const postLoginScreens = {};
postLoginScreens[Route.TAB_STACK] = TabStack;
postLoginScreens[Route.HOME_SCREEN] = HomeScreen;
postLoginScreens[Route.NOTE_SCREEN] = NoteScreen;
postLoginScreens[Route.TASK_SCREEN] = TaskScreen;

export const MainStack = () => {
  // const isLoggedIn = useStoreState((state) => state.user.isLoggedIn);
  const { isFinishLaunching, setIsFinishLaunching } = useAppContext();

  const getInitialRouteName = () => {
    return Route.SPLASH_SCREEN;
  };

  const getScreenCardStyleInterpolator = (name) => {
    switch (name) {
      case Route.TAB_STACK:
        return CardStyleInterpolators.forNoAnimation;
      default:
        return CardStyleInterpolators.forHorizontalIOS;
    }
  };

  console.log('MainStack -> getInitialRouteName :', getInitialRouteName());
  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: true,
        cardStyleInterpolator:
          deviceBrand.toLowerCase() === 'huawei'
            ? CardStyleInterpolators.forRevealFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      {Object.entries({
        // Use the screens normally
        // Use some screens conditionally based on some condition
        ...(isFinishLaunching ? {} : launchScreens),
        ...authScreens,
        ...postLoginScreens,
        ...commonScreens,
      }).map(([name, component], index) => {
        const keyIdn = name + '-' + index;
        return (
          <Stack.Screen
            key={keyIdn}
            name={name}
            component={component}
            options={{
              headerShown: false,
              cardStyleInterpolator: getScreenCardStyleInterpolator(name),
              gestureEnabled: false,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};
