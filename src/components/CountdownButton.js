/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import {useEffect, useRef, useState, useImperativeHandle} from 'react';

import {StyleSheet, AppState, View, Text} from 'react-native';

import {AppDefaultTheme} from '../contexts/theme/AppTheme';
import AppPressable from '~src/components/AppPressable';
import useLocalization from '~src/contexts/i18n';
import {Typography} from '~src/styles';
import {sw} from '~src/styles/Mixins';

const CountdownButton = React.forwardRef((props, ref) => {
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);
  const {locale, setLocale, t} = useLocalization();

  const appState = useRef(AppState.currentState);
  const countSecRef = useRef(props.countDownSec);
  const intervalRef = useRef();
  const untilRef = useRef(Math.max(countSecRef.current, 0));
  const lastUntilRef = useRef(null);
  const wentBackgroundAtRef = useRef(null);
  const [count, setCount] = useState(Math.max(countSecRef.current, 0));
  const [isBtnDisable, setIsBtnDisable] = useState(true);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    const id = setInterval(() => {
      updateTimer();
    }, 1000);
    intervalRef.current = id;
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
      clearInterval(intervalRef.current);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    console.log(
      'nextAppState',
      nextAppState,
      'appState.current',
      appState.current,
    );
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      wentBackgroundAtRef.current
    ) {
      console.log('App has come to the foreground!');
      const diff = (Date.now() - wentBackgroundAtRef.current) / 1000.0;
      lastUntilRef.current = untilRef.current;
      untilRef.current = parseInt(Math.max(0, untilRef.current - diff), 10);
      setCount(untilRef.current);
    }
    if (
      appState.current.match(/inactive|active/) &&
      nextAppState === 'background'
    ) {
      console.log('App has come to the background!');
      wentBackgroundAtRef.current = Date.now();
    }

    appState.current = nextAppState;
    console.log(
      'current AppState',
      appState.current,
      'nextAppState',
      nextAppState,
    );
  };

  const updateTimer = () => {
    if (lastUntilRef.current === untilRef.current) {
      return;
    }
    if (
      untilRef.current === 1 ||
      (untilRef.current === 0 && lastUntilRef.current !== 1)
    ) {
      if (props.onFinish) {
        props.onFinish();
      }
    }

    if (untilRef.current === 0) {
      lastUntilRef.current = 0;
      untilRef.current = 0;
      setIsBtnDisable(false);
    } else {
      lastUntilRef.current = untilRef.current;
      untilRef.current = Math.max(0, untilRef.current - 1);
    }
    setCount(untilRef.current === 0 ? '' : untilRef.current);
  };

  const restartCounter = () => {
    untilRef.current = Math.max(countSecRef.current, 0);
    lastUntilRef.current = null;
    setCount(Math.max(countSecRef.current, 0));
    setIsBtnDisable(true);
  };

  const resendOnPressed = () => {
    restartCounter();
    props.onPress();
  };

  useImperativeHandle(ref, () => ({
    enableResend() {
      lastUntilRef.current = 0;
      untilRef.current = 0;
      setIsBtnDisable(false);
      setCount(null);
    },
    overResendLimit() {
      setIsBtnDisable(true);
      setCount(0);
      lastUntilRef.current = 0;
      untilRef.current = 0;
      AppState.removeEventListener('change', _handleAppStateChange);
      clearInterval(intervalRef.current);
    },
  }));

  return (
    <View style={styles.viewLoginBtn} ref={ref}>
      <AppPressable onPress={resendOnPressed} disabled={isBtnDisable}>
        <Text
          style={[
            {
              color: !isBtnDisable ? '#B6B6B6' : '#656565',
            },
            styles.resendText,
          ]}>
          {count
            ? 'Resend Verification (' + count + 's)'
            : 'Resend Verification'}
        </Text>
      </AppPressable>
    </View>
  );
});

const getStyle = theme => {
  return StyleSheet.create({
    resendText: {
      ...Typography.ts(theme.fonts.weight.light, sw(20)),
      paddingBottom: sw(8),
      textDecorationLine: 'underline',
      marginTop: sw(17),
    },
  });
};

export default CountdownButton;
