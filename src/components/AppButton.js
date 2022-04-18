/* eslint-disable react/prop-types */
import React from 'react';

import { Pressable, StyleSheet, Text } from 'react-native';

import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const AppButton = ({ onPress, text, ...props }) => {
  const theme = AppDefaultTheme.settings;
  const styles = getStyle({ ...props, theme });

  const btnOnPressed = () => {
    onPress();
  };
  return (
    <Pressable
      onPress={btnOnPressed}
      style={({ pressed }) => [
        styles.btnView,
        props.disabled
          ? styles.btnDisabledStyle
          : pressed
          ? styles.btnDisabledStyle
          : {},
      ]}
      disabled={props.disabled}>
      {({ pressed }) => (
        <Text
          style={[
            styles.btnText,
            props.disabled
              ? styles.textDisabledStyle
              : pressed
              ? styles.textDisabledStyle
              : {},
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

const getStyle = ({ theme, ...props }) => {
  let btnBackgroundColor = props.btnBackgroundColor
    ? props.btnBackgroundColor
    : '#424450';
  let btnBorder = props.btnBorder ? props.btnBorder : null;
  let btnBorderColor = props.btnBorderColor ? props.btnBorderColor : '#FFF';
  let btnWidth = props.btnWidth ? props.btnWidth : sw(246);
  let btnBorderRadius = props.btnBorderRadius ? props.btnBorderRadius : sw(20);
  let btnTextPaddingVertical = props.btnTextPaddingVertical
    ? props.btnTextPaddingVertical
    : sw(15);
  let btnTextFontSize = props.btnTextFontSize ? props.btnTextFontSize : sw(20);
  let btnTextColor = props.btnTextColor ? props.btnTextColor : '#FFEAA1';
  let btnTextFont = props.btnTextFont
    ? props.btnTextFont
    : theme.fonts.weight.bold;

  return StyleSheet.create({
    btnView: {
      width: btnWidth,
      backgroundColor: btnBackgroundColor,
      justifyContent: 'center',
      borderRadius: btnBorderRadius,
      borderWidth: btnBorder,
      borderColor: btnBorderColor,
      paddingHorizontal: sw(15),
    },
    btnText: {
      ...Typography.ts(btnTextFont, btnTextFontSize),
      color: btnTextColor,
      textAlign: 'center',
      paddingVertical: btnTextPaddingVertical,
    },
    btnDisabledStyle: {
      opacity: 0.6,
    },
    textDisabledStyle: {
      opacity: 0.6,
    },
  });
};

export default AppButton;
