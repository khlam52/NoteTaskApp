import React, { useEffect, useRef, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  AosShareIcon,
  CameraIcon,
  FontIcon,
  IosShareIcon,
  PenIcon,
  PhotoLibraryIcon,
} from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import BaseHeader from '../../components/BaseHeader';
import CommonUtil from '../../utils/CommonUtil';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
import Route from '../../navigations/Route';

const CreateAndEditNoteScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const [inputTitle, setInputTitle] = useState(null);
  const [inputDate, setInputDate] = useState(CommonUtil.getMomentToday());

  let getNoteContentLayoutList = [];
  const [noteContentLayoutList, setNoteContentLayoutList] = useState([]);

  const inputRef = useRef(null);
  const [isShowFontIcon, setIsShowFontIcon] = useState(false);

  const bottomBtnList = [
    {
      icon: <PhotoLibraryIcon />,
      onPress: () => {
        accessImagePickerFunc();
      },
    },
    {
      icon: <CameraIcon />,
      onPress: () => {
        accessCameraPickerFunc();
      },
    },
    {
      icon: <PenIcon />,
      onPress: () => {
        if (
          noteContentLayoutList.length === 0 ||
          noteContentLayoutList[noteContentLayoutList.length - 1].type !==
            'TEXT'
        ) {
          getNoteContentLayoutList = [
            ...noteContentLayoutList,
            {
              type: 'TEXT',
              value: '',
              fontSize: sw(18),
              fontStyle: theme.fonts.weight.light,
              align: 'left',
              paddingLeft: sw(0),
              inputRef: null,
            },
          ];
          setNoteContentLayoutList(getNoteContentLayoutList);
        }
      },
    },
  ];

  useEffect(() => {
    console.log('noteContentLayoutList:', noteContentLayoutList);
  }, [noteContentLayoutList]);

  const onChangeTitle = (val) => {
    setInputTitle(val);
  };

  const onChangeContent = (val, index) => {
    let newNoteContentLayoutList = [...noteContentLayoutList];
    newNoteContentLayoutList[index].value = val;
    setNoteContentLayoutList(newNoteContentLayoutList);
  };

  const onFontIconPressed = () => {
    navigation.navigate(Route.BOTTOM_FONT_STYLE_SELECTION_MODAL);
  };

  const accessImagePickerFunc = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
      freeStyleCropEnabled: true,
      multiple: false,
      includeBase64: true,
    }).then((images) => {
      console.log(images);
      if (images) {
        getNoteContentLayoutList = [
          ...noteContentLayoutList,
          {
            type: 'IMAGE',
            image: images,
          },
        ];
        setNoteContentLayoutList(getNoteContentLayoutList);
      }
    });
  };

  const accessCameraPickerFunc = () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
    }).then((images) => {
      console.log(images);
      if (images) {
        getNoteContentLayoutList = [
          ...noteContentLayoutList,
          {
            type: 'IMAGE',
            image: images,
          },
        ];
        setNoteContentLayoutList(getNoteContentLayoutList);
      }
    });
  };

  const renderImageView = (item, index) => {
    return (
      <Image
        source={{ uri: item.image.path }}
        style={styles.images}
        key={index}
      />
    );
  };

  const renderTextInput = (item, index) => {
    return (
      <TextInput
        key={index}
        value={item.value}
        onChangeText={(val) => {
          onChangeContent(val, index);
        }}
        style={styles.inputContentText}
        multiline={true}
        placeholder={'Add Text...'}
        placeholderTextColor={'#B6B6B6'}
        ref={inputRef}
        onBlur={() => {
          console.log('inputRef:', inputRef.current.isFocused());
          setIsShowFontIcon(false);
        }}
        onFocus={() => {
          console.log('inputRef:', inputRef.current.isFocused());
          setIsShowFontIcon(true);
        }}
      />
    );
  };

  const renderInputContentView = () => {
    let contentViewList = [];
    noteContentLayoutList.map((item, index) => {
      if (item.type === 'TEXT') {
        contentViewList.push(renderTextInput(item, index));
      } else if (item.type === 'IMAGE') {
        contentViewList.push(renderImageView(item, index));
      }
    });
    return <View>{contentViewList}</View>;
  };

  const renderBottomBtnView = () => {
    return (
      <View style={styles.bottomBtnView}>
        {bottomBtnList.map((item, index) => {
          return (
            <AppPressable onPress={item.onPress} key={index}>
              <View key={index} style={styles.btnView}>
                {item.icon}
              </View>
            </AppPressable>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#1B191E' }}>
      <BaseHeader
        rightElement={
          <View style={styles.headerRightView}>
            {isShowFontIcon && (
              <AppPressable onPress={onFontIconPressed}>
                <View style={{ marginRight: sw(18) }}>
                  <FontIcon />
                </View>
              </AppPressable>
            )}
            {Platform.OS === 'ios' ? <IosShareIcon /> : <AosShareIcon />}
            <Text style={styles.doneText}>Done</Text>
          </View>
        }
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        style={styles.container}>
        <TextInput
          value={inputTitle}
          onChangeText={onChangeTitle}
          placeholder={'Input Title'}
          style={styles.inputTitleText}
        />
        <Text style={styles.dateText}>
          {CommonUtil.getMomentDate(inputDate)}
        </Text>
        {renderInputContentView()}
      </KeyboardAwareScrollView>

      {renderBottomBtnView()}
    </View>
  );
};

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      //   flex: 1,
      backgroundColor: '#1B191E',
      paddingTop: sw(50),
      paddingHorizontal: sw(30),
      paddingBottom: sw(90),
    },
    headerRightView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    doneText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(24)),
      color: '#FFEAA1',
      paddingLeft: sw(18),
    },
    inputTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(30)),
      color: '#FFF',
    },
    dateText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(18)),
      color: '#B6B6B6',
      marginVertical: sw(36),
    },
    inputContentText: {
      ...Typography.ts(theme.fonts.weight.light, sw(18)),
      color: '#FFF',
      lineHeight: sw(25),
    },
    contentView: {
      flex: 1,
    },
    bottomBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: sw(32),
      marginBottom: sw(45),
      marginTop: sw(18),
    },
    btnView: {
      borderRadius: sw(100),
      backgroundColor: '#000',
      width: sw(70),
      height: sw(70),
      alignItems: 'center',
      justifyContent: 'center',
    },
    images: {
      width: '100%',
      height: '100%',
      marginVertical: sw(12),
      borderRadius: sw(10),
    },
  });
};

export default CreateAndEditNoteScreen;
