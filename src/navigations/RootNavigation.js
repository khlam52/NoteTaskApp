import * as React from 'react';

import {StackActions, CommonActions} from '@react-navigation/native';

import Route from './Route';

const isReadyRef = React.createRef();
const navigationRef = React.createRef();
const routeNameRef = React.createRef();
var previousRouteName = '';
var currentRouteName = '';

const getScreenOptions = route => {
  // console.log('RootNavigation -> getScreenOptions -> route:', route);

  let defaultOption = {
    cardStyle: {backgroundColor: 'transparent'},
    cardOverlayEnabled: true,
    animationEnabled: false,
    transparentCard: true,
    gestureEnabled: false,
  };

  let modalOption = {
    ...defaultOption,
    cardStyleInterpolator: ({current: {progress}}) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
          extrapolate: 'clamp',
        }),
      },
    }),
  };

  const routeName = route.name;
  switch (routeName) {
    case Route.MAIN_STACK:
      return defaultOption;
    default:
      return null;
  }
};

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const onStateChange = state => {
  console.log(
    'RootStackScreen -> onStateChange -> currentRouteName:',
    navigationRef.current.getCurrentRoute().name,
  );

  console.log(
    'RootStackScreen -> onStateChange -> current page id: ',
    currentRouteName,
  );

  // console.log('RootStackScreen -> onStateChange -> state: ', state);

  // Save the current route name for later comparison
  routeNameRef.current = currentRouteName;
};

function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    console.log("Attempted to use Navigate but the app hasn't mounted!!!");
  }
}

function push(...args) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(...args));
  } else {
  }
}

function back(...args) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(CommonActions.goBack());
  } else {
  }
}

function replace(...args) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(args));
  } else {
  }
}

function remove(screenName) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name !== screenName);
      console.log('RootNavigation -> routes: ', routes);
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  } else {
  }
}

export default {
  isReadyRef,
  navigationRef,
  routeNameRef,
  previousRouteName,
  currentRouteName,
  getScreenOptions,
  getActiveRouteName,
  onStateChange,
  navigate,
  push,
  back,
  replace,
  remove,
};
