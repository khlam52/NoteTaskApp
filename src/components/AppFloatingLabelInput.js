/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from 'react-native';

import {ShowEyeIcon, HideEyeIcon} from '~src/assets/images';
import {AppDefaultTheme} from '~src/contexts/theme/AppTheme';
import {Typography} from '~src/styles';
import {sw} from '~src/styles/Mixins';

const defaultInputBoxHeight = 72;

const theme = AppDefaultTheme.settings;

const AppFloatingLabelInput = React.forwardRef(
  ({value, placeholder, inputState, maxLength, ...props}, ref) => {
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

    const styles = getStyle({...theme, ...colorValues}, Platform.OS);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [isPassword, setIsPassword] = useState(props.secureTextEntry);
    const [showPasswordEyeIcon, setShowPasswordEyeIcon] = useState(
      props.eyeIcon,
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    useEffect(() => {
      console.log('AppFloatingLabelInput -> useEffect -> value: ', value);
      value ? setHasValue(true) : setHasValue(false);
    }, [value]);

    const showPassword = () => {
      setIsPassword(prevState => !prevState);
    };

    const textInputStyle = {
      ...Typography.ts(Typography.FONT_FAMILY_400, 18, 22.5),
      color: inputTextColor,
      marginTop: isFocused || hasValue ? sw(theme.spacings.s2) : 0,
      paddingBottom: Platform.OS === 'android' ? sw(5) : 0,
      paddingLeft: Platform.OS === 'android' ? -sw(5) : 0,
      flex: 1,
    };

    return [
      <View
        key={'componentMainView'}
        style={{
          ...styles.outerViewStyle,
          ...(isFocused
            ? styles.outerViewStyleFocus
            : styles.outerViewStyleBlur),
          ...(props.showErrorLine
            ? {
                borderBottomWidth: Platform.OS === 'ios' ? sw(5) : sw(10),
                borderBottomColor: '#F78989',
              }
            : null),
        }}>
        <Text
          style={{
            ...styles.placeholderStyle,
            ...(isFocused || hasValue ? styles.placeholderActiveStyle : null),
          }}>
          {placeholder}
        </Text>
        <TextInput
          {...props}
          value={value}
          style={textInputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword}
          maxLength={maxLength}
          ref={ref}
          autoCorrect={false}
        />
        {showPasswordEyeIcon && (
          <View style={styles.viewShowPassowrd}>
            <Pressable onPress={showPassword}>
              {isPassword && (
                <ShowEyeIcon
                  width={sw(24)}
                  height={sw(22)}
                  fill={theme.colors.text22}
                />
              )}
              {!isPassword && (
                <HideEyeIcon
                  width={sw(24)}
                  height={sw(22)}
                  fill={theme.colors.text60}
                />
              )}
            </Pressable>
          </View>
        )}
      </View>,
      <View key={'componentErrorMessageView'}>
        {/* <Text>Error Message</Text> */}
      </View>,
    ];
  },
);

const getStyle = (theme, locale, os) => {
  return StyleSheet.create({
    outerViewStyle: {
      height: sw(defaultInputBoxHeight),
      width: sw(305),
      paddingHorizontal: sw(theme.spacings.s2),
      paddingVertical: sw(2),
      borderRadius: sw(10),
      marginTop: sw(9),
    },
    outerViewStyleBlur: {
      borderColor: theme.borderColor,
      backgroundColor: theme.backgroundFocusColor,
    },
    outerViewStyleFocus: {
      borderColor: theme.borderFocusColor,
      backgroundColor: theme.backgroundColor,
    },
    placeholderStyle: {
      position: 'absolute',
      left: sw(17),
      top: sw(20),
      ...Typography.ts(
        theme.fonts.weight.regular,
        theme.fonts.size.lead,
        sw(theme.fonts.size.lead + 2.5),
      ),
      color: theme.placeHolderTextColor,
      ...(os !== 'android' && locale !== 'en'
        ? {paddingTop: sw(theme.fonts.size.lead * 0.15)}
        : null),
    },
    placeholderActiveStyle: {
      top: sw(9),
      ...Typography.ts(
        theme.fonts.weight.regular,
        theme.fonts.size.note2,
        17.5,
      ),
      color: theme.placeHolderTextFocusColor,
    },
    viewShowPassowrd: {
      position: 'absolute',
      right: sw(0),
      marginTop: sw((defaultInputBoxHeight - 22) / 2),
      marginRight: sw(theme.spacings.s2),
    },
  });
};
export default AppFloatingLabelInput;
