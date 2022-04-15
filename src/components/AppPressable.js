import React from 'react';

import {Pressable, StyleSheet} from 'react-native';

import {AppDefaultTheme} from '~src/contexts/theme/AppTheme';
import {Typography} from '~src/styles';
import {sw, sf} from '~src/styles/Mixins';

const AppPressable = ({children, ...props}) => {
  const theme = AppDefaultTheme.settings;
  const styles = getStyle({...props, theme});

  return (
    <Pressable
      {...props}
      hitSlop={{
        top: 15,
        right: 15,
        bottom: 15,
        left: 15,
      }}
      style={({pressed}) => {
        return [
          pressed
            ? styles.disabledStyle
            : props.disabled
            ? props.customDisabledStyle
              ? null
              : null
            : null,
        ];
      }}>
      {/* <Text style={styles.btnText}>{text}</Text> */}
      {children}
    </Pressable>
  );
};

const getStyle = ({theme, ...props}) => {
  let textUnderLine = props.textUnderLine ? props.textUnderLine : 'underline';
  let textWeight = props.textWeight
    ? props.textWeight
    : theme.fonts.weight.light;
  let textColor = props.textColor ? props.textColor : '#B6B6B6';
  return StyleSheet.create({
    btnText: {
      ...Typography.ts(textWeight, sf(20)),
      color: textColor,
      paddingBottom: sw(8),
      textDecorationLine: textUnderLine,
    },
    disabledStyle: {
      opacity: 0.3,
    },
  });
};

export default AppPressable;
