import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomFontStyleSelectionModal from '../screens/Modal/BottomFontStyleSelectionModal';
import { MainStack } from './MainStack';
import Route from './Route';
import RootNavigation from '~src/navigations/RootNavigation';

const commonModals = {};
commonModals[Route.BOTTOM_FONT_STYLE_SELECTION_MODAL] =
  BottomFontStyleSelectionModal;

const Stack = createStackNavigator();

export default function RootStack() {
  React.useEffect(() => {
    return () => (RootNavigation.isReadyRef.current = false);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={RootNavigation.navigationRef}
        onStateChange={RootNavigation.onStateChange}
        onReady={() => {
          console.log('RootStack -> NavigationContainer -> onReady');
          RootNavigation.isReadyRef.current = true;
          RootNavigation.routeNameRef.current =
            RootNavigation.navigationRef.current.getCurrentRoute().name;
          // CustomEventEmitter.emit(
          //   CustomEventEmitter.EVENT_NAVIGATION_CONTAINER_IS_READY,
          // );
        }}>
        <Stack.Navigator
          presentation="modal"
          initialRouteName={Route.MAIN_STACK}
          screenOptions={({ route }) => {
            return RootNavigation.getScreenOptions(route);
          }}>
          {Object.entries({
            // Use the screens normally
            ...commonModals,
            // Use some screens conditionally based on some condition
          }).map(([name, component], index) => {
            const keyIdn = name + '-' + index;
            return (
              <Stack.Screen
                key={keyIdn}
                name={name}
                component={component}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  presentation: 'transparentModal',
                }}
              />
            );
          })}

          <Stack.Screen
            name={Route.MAIN_STACK}
            component={MainStack}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
