/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';

import { PenIcon } from '../assets/images';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const defaultInputBoxHeight = 72;

const theme = AppDefaultTheme.settings;

const AppEditLabelInput = React.forwardRef(
  (
    {
      value,
      placeholder,
      inputState,
      maxLength,
      isShowEditIcon = true,
      ...props
    },
    ref,
  ) => {
    // custom color for app input
    let {
      placeHolderTextFocusColor,
      placeHolderTextColor,
      inputTextColor,
      borderFocusColor,
      borderColor,
      backgroundFocusColor,
      backgroundColor,
    } = props;

    // set custom color if any
    if (!placeHolderTextFocusColor) {
      placeHolderTextFocusColor = theme.colors.placeholderFocus;
    }

    if (!placeHolderTextColor) {
      placeHolderTextColor = theme.colors.placeholder;
    }

    if (!inputTextColor) {
      inputTextColor = theme.colors.text;
    }

    if (!borderFocusColor) {
      borderFocusColor = theme.colors.borderFocus;
    }

    if (!borderColor) {
      borderColor = theme.colors.border;
    }

    if (!backgroundColor) {
      backgroundColor = theme.colors.inputBlur;
    }

    if (!backgroundFocusColor) {
      backgroundFocusColor = theme.colors.inputFocus;
    }

    let colorValues = {
      inputTextColor,
      placeHolderTextColor,
      placeHolderTextFocusColor,
      borderColor,
      borderFocusColor,
      backgroundColor,
      backgroundFocusColor,
    };
    // set custom color if any

    const styles = getStyle({ ...theme, ...colorValues }, Platform.OS);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    useEffect(() => {
      console.log('AppEditLabelInput -> useEffect -> value: ', value);
      value ? setHasValue(true) : setHasValue(false);
    }, [value]);

    const textInputStyle = {
      ...Typography.ts(Typography.FONT_FAMILY_300, 24),
      color: '#FFF',
      paddingLeft: Platform.OS === 'android' ? -sw(5) : 0,
      // flex: 1,
    };

    return (
      <View style={styles.container}>
        {props.rightIcon && (
          <View style={{ marginRight: Platform.OS === 'android' ? 0 : sw(12) }}>
            {props.rightIcon}
          </View>
        )}
        <View
          key={'componentMainView'}
          style={{
            ...styles.outerViewStyle,
            ...(props.showErrorLine
              ? {
                  borderBottomColor: '#F78989',
                }
              : null),
          }}>
          {props.isInputPhone && <Text style={textInputStyle}>+852 </Text>}
          <TextInput
            {...props}
            value={value}
            style={textInputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            ref={ref}
            autoCorrect={false}
          />
        </View>
        {isShowEditIcon && (
          <View style={{ marginLeft: sw(16) }}>
            <PenIcon />
          </View>
        )}
      </View>
    );
  },
);

const getStyle = (theme, locale, os) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    outerViewStyle: {
      flexDirection: 'row',
      width: sw(257),
      paddingHorizontal: sw(15),
      paddingVertical: Platform.OS === 'ios' ? sw(5) : 0,
      marginTop: Platform.OS !== 'ios' ? sw(-10) : 0,
      borderColor: theme.borderColor,
      borderBottomWidth: sw(1),
      borderBottomColor: '#FFF',
    },
  });
};
export default AppEditLabelInput;
