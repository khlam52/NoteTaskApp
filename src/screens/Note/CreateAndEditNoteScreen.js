import React, { useEffect, useState } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import {
  AosShareIcon,
  CameraIcon,
  CloseIcon,
  DeleteIcon,
  FontIcon,
  IosShareIcon,
  PenIcon,
  PhotoLibraryIcon,
} from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import BaseHeader from '../../components/BaseHeader';
import Route from '../../navigations/Route';
import StorageService from '../../services/StorageService';
import CommonUtil from '../../utils/CommonUtil';
import NoteHelper from '../../utils/NoteHelper';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const CreateAndEditNoteScreen = ({ navigation, route }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const loadRecentNoteList = useStoreActions(
    (action) => action.user.loadRecentNoteList,
  );
  const recentNoteList = useStoreState((state) => state.user.recentNoteList);
  const isCreateNote = _.get(route, 'params.isCreateNote', false);
  const selectedNoteItem = _.get(route, 'params.selectedNoteItem', []);

  const selectedTitle = _.get(selectedNoteItem, 'title', '');
  const createAt = _.get(selectedNoteItem, 'createAt', '');
  const noteContent = _.get(selectedNoteItem, 'content', []);
  const selectedUid = _.get(selectedNoteItem, 'uid', '');

  const [inputTitle, setInputTitle] = useState(selectedTitle);
  const [inputDate, setInputDate] = useState(
    createAt ? createAt : CommonUtil.getMomentToday(),
  );

  let getNoteContentLayoutList = [];
  const [noteContentLayoutList, setNoteContentLayoutList] =
    useState(noteContent);
  const [isShowFontIcon, setIsShowFontIcon] = useState(false);

  const [editingTextIndex, setEditingTextIndex] = useState(null);
  const [selectingImageIndex, setSelectingImageIndex] = useState(null);
  const [isShowLongPressHandle, setIsShowLongPressHandle] = useState(false);

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
        getNoteContentLayoutList = [
          ...noteContentLayoutList,
          {
            type: 'TEXT',
            value: '',
            fontStyle: 'normal',
            fontSizeOption: 'B',
            fontSize: sw(18),
            fontWeight: '300',
            textDecorationLine: null,
            align: 'left',
            paddingLeft: sw(0),
            paddingRight: sw(0),
          },
        ];
        setNoteContentLayoutList(getNoteContentLayoutList);
      },
    },
  ];

  useEffect(() => {
    console.log('noteContentLayoutList:', noteContentLayoutList);
    console.log('selectedNoteItem:', selectedNoteItem);
  }, [noteContentLayoutList, editingTextIndex]);

  const onChangeTitle = (val) => {
    setInputTitle(val);
  };

  const onChangeContent = (val, index) => {
    let newNoteContentLayoutList = [...noteContentLayoutList];
    newNoteContentLayoutList[index].value = val;
    setNoteContentLayoutList(newNoteContentLayoutList);
  };

  const onFontIconPressed = () => {
    navigation.navigate(Route.BOTTOM_FONT_STYLE_SELECTION_MODAL, {
      getSelectCallBack: getSelectFontFormatCallBack,
      selectedCallBack: noteContentLayoutList[editingTextIndex],
    });
  };

  const onDonePressed = () => {
    let data = {
      title: inputTitle,
      content: noteContentLayoutList,
      createAt: inputDate,
      uid: isCreateNote ? uuidv4() : selectedUid,
    };
    if (isCreateNote) {
      let newNoteList = recentNoteList;
      newNoteList.push(data);
      StorageService.setNoteList(newNoteList);
      NoteHelper.getNoteList(loadRecentNoteList);
    } else {
      recentNoteList.map((item) => {
        if (item.uid === selectedUid) {
          item.title = data.title;
          item.content = data.content;
          item.createAt = CommonUtil.getMomentDate(CommonUtil.getMomentToday());
        }
      });
      StorageService.setNoteList(recentNoteList);
      NoteHelper.getNoteList(loadRecentNoteList);
    }
    navigation.goBack();
  };

  // Insert Image Handle
  const accessImagePickerFunc = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
      freeStyleCropEnabled: true,
      multiple: false,
      includeBase64: true,
    }).then((images) => {
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

  const renderImageLongPressHandleView = (item, index) => {
    return (
      <View style={styles.longPressImageView}>
        <AppPressable
          onPress={() => {
            setIsShowLongPressHandle(false);
          }}>
          <CloseIcon width={sw(18)} height={sw(18)} />
        </AppPressable>
        <View style={styles.longPressLineSeparator} />
        <AppPressable
          onPress={() => {
            let newNoteContentLayoutList = [...noteContentLayoutList];
            newNoteContentLayoutList.splice(index, 1);
            setNoteContentLayoutList(newNoteContentLayoutList);
            setIsShowLongPressHandle(false);
          }}>
          <DeleteIcon />
        </AppPressable>
      </View>
    );
  };

  const renderImageView = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onLongPress={() => {
          setIsShowLongPressHandle(true);
          setSelectingImageIndex(index);
        }}
        style={{ marginVertical: sw(12) }}>
        <Image
          source={{ uri: item.image.path }}
          style={styles.images}
          key={index}
        />
        {isShowLongPressHandle &&
          selectingImageIndex === index &&
          renderImageLongPressHandleView(item, index)}
      </TouchableOpacity>
    );
  };
  ////

  // Insert Text Handle
  const getSelectFontFormatCallBack = (item) => {
    let newNoteContentLayoutList = [...noteContentLayoutList];
    newNoteContentLayoutList[editingTextIndex].fontStyle =
      item.selectedFontStyle;
    newNoteContentLayoutList[editingTextIndex].fontSizeOption =
      item.selectedFontSizeOption;
    newNoteContentLayoutList[editingTextIndex].fontSize = item.selectedFontSize;
    newNoteContentLayoutList[editingTextIndex].fontWeight =
      item.selectedFontWeight;
    newNoteContentLayoutList[editingTextIndex].textDecorationLine =
      item.selectedTextDecorationLine;
    newNoteContentLayoutList[editingTextIndex].align = item.selectedAlignStyle;
    newNoteContentLayoutList[editingTextIndex].paddingLeft =
      item.selectedPaddingLeft;
    newNoteContentLayoutList[editingTextIndex].paddingRight =
      item.selectedPaddingRight;
    setNoteContentLayoutList(newNoteContentLayoutList);
  };

  const getItemFontFormat = (item, index) => {
    return {
      color: '#FFF',
      fontStyle: item.fontStyle,
      fontSize: item.fontSize,
      fontWeight: item.fontWeight,
      textDecorationLine: item.textDecorationLine,
      textAlign: item.align,
      paddingLeft: item.paddingLeft,
      paddingRight: item.paddingRight,
    };
  };

  const renderTextInput = (item, index) => {
    return (
      <TextInput
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace' && item.value === '') {
            let newNoteContentLayoutList = [...noteContentLayoutList];
            newNoteContentLayoutList.splice(index, 1);
            setNoteContentLayoutList(newNoteContentLayoutList);
          }
        }}
        key={index}
        value={item.value}
        onChangeText={(val) => {
          onChangeContent(val, index);
        }}
        style={getItemFontFormat(item, index)}
        multiline={true}
        placeholder={'Add Text...'}
        placeholderTextColor={'#B6B6B6'}
        onBlur={() => {
          setIsShowFontIcon(false);
        }}
        onFocus={() => {
          setIsShowFontIcon(true);
          setEditingTextIndex(index);
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
    return <View style={{ flex: 1 }}>{contentViewList}</View>;
  };
  ////

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
            {isShowFontIcon && Platform.OS === 'ios' && (
              <AppPressable onPress={onFontIconPressed}>
                <View style={{ marginRight: sw(18) }}>
                  <FontIcon />
                </View>
              </AppPressable>
            )}
            {/* {Platform.OS === 'ios' ? <IosShareIcon /> : <AosShareIcon />} */}
            <AppPressable onPress={onDonePressed}>
              <Text style={styles.doneText}>Done</Text>
            </AppPressable>
          </View>
        }
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
        enableOnAndroid={true}>
        <View style={styles.container}>
          <TextInput
            value={inputTitle}
            onChangeText={onChangeTitle}
            placeholder={'Input Title'}
            style={styles.inputTitleText}
            placeholderTextColor={'#B6B6B6'}
          />
          <Text style={styles.dateText}>
            {isCreateNote ? CommonUtil.getMomentDate(inputDate) : inputDate}
          </Text>
          {renderInputContentView()}
        </View>
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
      height: sw(300),
      marginVertical: sw(12),
      borderRadius: sw(10),
    },
    longPressImageView: {
      flexDirection: 'row',
      width: sw(100),
      height: sw(40),
      alignSelf: 'flex-end',
      marginTop: sw(-60),
      marginRight: sw(20),
      backgroundColor: '#252525',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: sw(30),
      paddingHorizontal: sw(16),
    },
    longPressLineSeparator: {
      width: sw(2),
      height: sw(40),
      backgroundColor: '#424450',
    },
  });
};

export default CreateAndEditNoteScreen;
