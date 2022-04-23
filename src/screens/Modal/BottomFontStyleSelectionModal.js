import React, { useState } from 'react';

import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import Modal from 'react-native-modalbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CenterAlignIcon,
  CloseIcon,
  LeftAlignIcon,
  PaddingLeftIcon,
  PaddingRightIcon,
  RightAlignIcon,
} from '../../assets/images';
import { AppDefaultTheme } from '../../contexts/theme/AppTheme';
import AppPressable from '~src/components/AppPressable';
import BottomSheet from '~src/components/BottomSheet';
import useAppContext from '~src/contexts/app';
import useLocalization from '~src/contexts/i18n';
import { Typography } from '~src/styles';
import { sh, sw } from '~src/styles/Mixins';
// import CommonUtil from '~src/utils/CommonUtil';

export default function BottomFontStyleSelectionModal({ route, navigation }) {
  const { locale, setLocale, t, getField } = useLocalization();
  const { showLoading, hideLoading } = useAppContext();
  const insets = useSafeAreaInsets();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(insets, theme);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(true);
  let selectCallBack = _.get(route, 'params.getSelectCallBack', () => {});

  const [selectedFontSize, setSelectedFontSize] = useState('T');

  const [selectedFontStyle, setSelectedFontStyle] = useState('B');
  const [isSelectedBold, setIsSelectedBold] = useState(true);
  const [isSelectedItalic, setIsSelectedItalic] = useState(false);
  const [isSelectedUnderline, setIsSelectedUnderline] = useState(false);
  const [isSelectedLineThrough, setIsSelectedLineThrough] = useState(false);

  const [selectedAlignStyle, setSeletedAlignStyle] = useState('left');
  const [selectedPaddingRight, setSelectedPaddingRight] = useState(0);
  const [selectedPaddingLeft, setSelectedPaddingLeft] = useState(0);

  const fontSizeList = [
    {
      option: 'T',
      title: 'Title',
      size: sw(30),
      style: theme.fonts.weight.bold,
    },
    {
      option: 'H',
      title: 'Heading',
      size: sw(24),
      style: theme.fonts.weight.bold,
    },
    {
      option: 'S',
      title: 'Subheading',
      size: sw(20),
      style: theme.fonts.weight.regular,
    },
    {
      option: 'B',
      title: 'Body',
      size: sw(18),
      style: theme.fonts.weight.light,
    },
  ];

  const fontStyleList = [
    {
      title: 'B',
      style: 'bold',
    },
    {
      title: 'I',
      style: 'italic',
    },
    {
      title: 'U',
      style: 'underline',
    },
    {
      title: 'S',
      style: 'line-through',
    },
  ];

  const alignStylelist = [
    {
      icon: <LeftAlignIcon />,
      style: 'left',
    },
    {
      icon: <CenterAlignIcon />,
      style: 'center',
    },
    {
      icon: <RightAlignIcon />,
      style: 'right',
    },
  ];

  const paddingStylelist = [
    {
      title: 'right',
      icon: <PaddingRightIcon />,
      style: sw(20),
    },
    {
      title: 'left',
      icon: <PaddingLeftIcon />,
      style: sw(20),
    },
  ];

  // Get Style func
  const fontSizeStyle = (style, size) => {
    return {
      ...Typography.ts(style, size),
      color: '#FFF',
    };
  };

  const checkfontSizeViewStyle = (item, index) => {
    return {
      ...styles.fontSizeItem,
      backgroundColor: selectedFontSize === item.option ? '#424450' : null,
      borderRadius: selectedFontSize === item.option ? sw(30) : null,
    };
  };

  const fontStyleStyle = (title, style) => {
    return {
      color: '#FFF',
      fontStyle: title === 'I' ? style : 'normal',
      fontSize: sw(45),
      fontWeight: title === 'B' ? style : '400',
      textDecorationLine: title === 'U' ? style : title === 'S' ? style : null,
    };
  };

  const checkFontStyleViewStyle = (item, index) => {
    return {
      ...styles.fontStyleItem,
      backgroundColor:
        (isSelectedBold && item.title === 'B') ||
        (isSelectedItalic && item.title === 'I') ||
        (isSelectedUnderline && item.title === 'U') ||
        (isSelectedLineThrough && item.title === 'S')
          ? '#424450'
          : '#252525',
      borderTopLeftRadius: index === 0 ? sw(30) : null,
      borderBottomLeftRadius: index === 0 ? sw(30) : null,
      borderTopRightRadius: index === fontStyleList.length - 1 ? sw(30) : null,
      borderBottomRightRadius:
        index === fontStyleList.length - 1 ? sw(30) : null,
    };
  };

  const checkAlignViewStyle = (item, index) => {
    return {
      ...styles.alignStyleItem,
      backgroundColor:
        selectedAlignStyle === item.style ? '#424450' : '#252525',
      borderTopLeftRadius: index === 0 ? sw(30) : null,
      borderBottomLeftRadius: index === 0 ? sw(30) : null,
      borderTopRightRadius: index === alignStylelist.length - 1 ? sw(30) : null,
      borderBottomRightRadius:
        index === alignStylelist.length - 1 ? sw(30) : null,
    };
  };

  const checkPaddingViewStyle = (item, index) => {
    return {
      ...styles.alignStyleItem,
      backgroundColor:
        selectedAlignStyle === item.style ? '#424450' : '#252525',
      borderTopLeftRadius: index === 0 ? sw(30) : null,
      borderBottomLeftRadius: index === 0 ? sw(30) : null,
      borderTopRightRadius:
        index === paddingStylelist.length - 1 ? sw(30) : null,
      borderBottomRightRadius:
        index === paddingStylelist.length - 1 ? sw(30) : null,
    };
  };
  ////

  const updateFontStyleSeletion = (title) => {
    if (title === 'B') {
      setIsSelectedBold(!isSelectedBold);
    }
    if (title === 'I') {
      setIsSelectedItalic(!isSelectedItalic);
    }
    if (title === 'U') {
      setIsSelectedUnderline(!isSelectedUnderline);
    }
    if (title === 'S') {
      setIsSelectedLineThrough(!isSelectedLineThrough);
    }
  };

  const updatePaddingStyleSelection = (title) => {
    if (title === 'right' && selectedAlignStyle === 'right') {
      setSelectedPaddingRight(selectedPaddingRight + 20);
    } else if (title === 'left' && selectedAlignStyle === 'left') {
      setSelectedPaddingLeft(selectedPaddingLeft + 20);
    }
  };

  const onCloseButtonPressed = async () => {
    navigation.goBack();
  };

  const renderFontSizeView = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.fontSizeListView}>
        {fontSizeList.map((item, index) => {
          return (
            <View key={index} style={checkfontSizeViewStyle(item, index)}>
              <AppPressable
                onPress={() => {
                  setSelectedFontSize(item.option);
                }}>
                <Text style={fontSizeStyle(item.style, item.size)}>
                  {item.title}
                </Text>
              </AppPressable>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderFontStyleView = () => {
    return (
      <View style={styles.fontStyleListView}>
        {fontStyleList.map((item, index) => {
          return (
            <View key={index} style={checkFontStyleViewStyle(item, index)}>
              <AppPressable
                onPress={() => {
                  updateFontStyleSeletion(item.title);
                }}>
                <Text style={fontStyleStyle(item.title, item.style)}>
                  {item.title}
                </Text>
              </AppPressable>
            </View>
          );
        })}
      </View>
    );
  };

  const renderAlignView = () => {
    return (
      <View style={styles.alignStyleListView}>
        {alignStylelist.map((item, index) => {
          return (
            <View key={index} style={checkAlignViewStyle(item, index)}>
              <AppPressable
                onPress={() => {
                  setSeletedAlignStyle(item.style);
                }}>
                {item.icon}
              </AppPressable>
            </View>
          );
        })}
      </View>
    );
  };

  const renderPaddingView = () => {
    return (
      <View style={styles.paddingStyleListView}>
        {paddingStylelist.map((item, index) => {
          return (
            <View key={index} style={checkPaddingViewStyle(item, index)}>
              <AppPressable
                onPress={() => {
                  updatePaddingStyleSelection(item.title);
                }}>
                {item.icon}
              </AppPressable>
            </View>
          );
        })}
      </View>
    );
  };

  const renderFontFormatView = () => {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <AppPressable
              onPress={onCloseButtonPressed}
              hitSlop={{ top: 100, left: 100, bottom: 100, right: 100 }}>
              <View style={{ paddingRight: sw(55) }}>
                <CloseIcon />
              </View>
            </AppPressable>
            <Text style={styles.titleText}>{'Font Format'}</Text>
          </View>
          {/* Selection Content */}
          {renderFontSizeView()}
          {renderFontStyleView()}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: sw(12),
              justifyContent: 'space-between',
              marginBottom: sw(60),
            }}>
            {renderAlignView()}
            {renderPaddingView()}
          </View>
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      view={renderFontFormatView()}
      isOpenBottomSheet={isOpenBottomSheet}
      onSetIsOpenBottomSheet={setIsOpenBottomSheet}
    />
  );
}

const getStyle = (insets, theme) => {
  return StyleSheet.create({
    outerContainer: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    container: {
      borderTopLeftRadius: sw(theme.roundness.container),
      borderTopRightRadius: sw(theme.roundness.container),
      paddingBottom: sh(20),
    },
    buttonContainer: {
      marginTop: sh(theme.spacings.s3),
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginBottom: sw(40),
    },
    titleText: {
      textAlign: 'center',
      ...Typography.ts(theme.fonts.weight.bold, sw(30)),
      color: '#FFF',
      paddingRight: sw(44),
    },
    fontSizeListView: {
      flexDirection: 'row',
      paddingHorizontal: sw(12),
      marginBottom: sw(20),
    },
    fontStyleListView: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: sw(20),
    },
    alignStyleListView: {
      flexDirection: 'row',
    },
    paddingStyleListView: {
      flexDirection: 'row',
    },
    fontSizeItem: {
      paddingHorizontal: sw(18),
      paddingVertical: sw(16),
      alignSelf: 'center',
    },
    fontStyleItem: {
      width: sw(96),
      height: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sw(2),
    },
    alignStyleItem: {
      width: sw(73),
      height: sw(61),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sw(2),
    },
  });
};
