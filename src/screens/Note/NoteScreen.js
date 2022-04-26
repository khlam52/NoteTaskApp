import React, { useCallback, useEffect, useState } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import _ from 'lodash';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  LayoutAnimation,
} from 'react-native';

import {
  CloseIcon,
  DeleteIcon,
  NoNoteIcon,
  TickIcon,
  UnTickIcon,
} from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import BaseHeader from '../../components/BaseHeader';
import Route from '../../navigations/Route';
import NoteHelper from '../../utils/NoteHelper';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
import StorageService from '../../services/StorageService';
import { useFocusEffect } from '@react-navigation/native';

const NoteScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const loadRecentNoteList = useStoreActions(
    (action) => action.user.loadRecentNoteList,
  );

  const recentNoteList = useStoreState((state) => state.user.recentNoteList);

  const [noteList, setNodeList] = useState(recentNoteList);

  const [isItemLongPressed, setIsItemLongPressed] = useState(false);

  const [selectedList, setSelectedList] = useState(
    NoteHelper.getSeletedList(recentNoteList),
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     setNodeList(recentNoteList);
  //   }, []),
  // );

  useEffect(() => {
    console.log('recentNoteList in Note Screen:', recentNoteList);
    setNodeList(recentNoteList);
    setSelectedList(NoteHelper.getSeletedList(recentNoteList));
  }, [recentNoteList]);

  const showAnimationView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const onDeleteIconPressed = async () => {
    await NoteHelper.deleteNoteFunc(
      selectedList,
      recentNoteList,
      loadRecentNoteList,
      setNodeList,
    );
    showAnimationView();
    setIsItemLongPressed(false);
  };

  const onItemPressed = (item, index) => {
    navigation.navigate(Route.CREATE_AND_EDIT_NOTE_SCREEN, {
      selectedNoteItem: recentNoteList[index],
    });
  };

  const getItemTextStyle = (item, index) => {
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

  const renderTextContentView = (item, index) => {
    return (
      <View key={index}>
        <Text style={getItemTextStyle(item, index)}>{item.value}</Text>
      </View>
    );
  };

  const renderImageContentView = (item, index) => {
    return (
      <View key={index}>
        <Image
          source={{ uri: item.image.path }}
          style={styles.images}
          key={index}
        />
      </View>
    );
  };

  const renderItemContent = (item, index) => {
    let contentViewList = [];
    item.content.map((contentItem, contentIndex) => {
      if (contentIndex < 2) {
        if (contentItem.type === 'TEXT') {
          contentViewList.push(
            renderTextContentView(contentItem, contentIndex),
          );
        } else if (contentItem.type === 'IMAGE') {
          contentViewList.push(
            renderImageContentView(contentItem, contentIndex),
          );
        }
      }
    });
    return <View key={index}>{contentViewList}</View>;
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <AppPressable
          onLongPress={() => {
            showAnimationView();
            setIsItemLongPressed(true);
          }}
          disabled={isItemLongPressed}
          onPress={() => {
            onItemPressed(item, index);
          }}>
          <View key={index} style={styles.itemView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {renderItemContent(item, index)}
            </ScrollView>
          </View>
        </AppPressable>
        {isItemLongPressed && (
          <View style={styles.longPressCircleView}>
            {renderNoteItemSelectView(item, index)}
          </View>
        )}
      </View>
    );
  };

  const renderNoteItemSelectView = (item, index) => {
    showAnimationView();
    return (
      <View>
        <AppPressable
          onPress={() => {
            let temp = selectedList.map((subItem, i) => {
              return index === i
                ? { ...subItem, isSelected: !selectedList[index].isSelected }
                : subItem;
            });
            setSelectedList(temp);
          }}>
          {selectedList.length !== 0 && selectedList[index].isSelected ? (
            <TickIcon fill={'#FFEAA1'} width={sw(25)} height={sw(25)} />
          ) : (
            <UnTickIcon
              stroke={'#FFEAA1'}
              fill={'#2A2A32'}
              width={sw(25)}
              height={sw(25)}
            />
          )}
        </AppPressable>
      </View>
    );
  };

  const renderSelectAllView = () => {
    showAnimationView();
    return (
      <View style={styles.selectAllView}>
        <AppPressable
          onPress={() => {
            let newValue =
              selectedList.filter((item) => item.isSelected).length ===
              selectedList.length;
            let temp = selectedList.map((item) => {
              return { ...item, isSelected: !newValue };
            });
            setSelectedList(temp);
          }}>
          <View style={styles.selectAllLeftView}>
            {selectedList.filter((item) => item.isSelected).length ===
            selectedList.length ? (
              <TickIcon fill={'#FFEAA1'} width={sw(25)} height={sw(25)} />
            ) : (
              <UnTickIcon stroke={'#FFEAA1'} width={sw(25)} height={sw(25)} />
            )}
            <Text style={styles.selectAllText}>Select All</Text>
          </View>
        </AppPressable>

        <View style={styles.longPressImageView}>
          <AppPressable
            onPress={() => {
              showAnimationView();
              setIsItemLongPressed(false);
            }}>
            <CloseIcon width={sw(18)} height={sw(18)} />
          </AppPressable>
          <View style={styles.longPressLineSeparator} />
          <AppPressable onPress={onDeleteIconPressed}>
            <DeleteIcon />
          </AppPressable>
        </View>
      </View>
    );
  };

  const noResultScreen = () => (
    <View style={{ alignItems: 'center', marginTop: sw(150) }}>
      <NoNoteIcon />
      <Text style={styles.addNoteText}>Add Note</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Notes</Text>
        {isItemLongPressed && renderSelectAllView()}
        <FlatList
          data={noteList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  paddingBottom: sw(200),
                }}
              />
            );
          }}
          ListEmptyComponent={noResultScreen}
        />
      </View>
    </View>
  );
};

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
    },
    flatList: {
      paddingTop: sw(30),
      marginHorizontal: sw(13),
    },
    text: {
      ...Typography.ts(theme.fonts.weight.bold, sw(45)),
      color: '#FFF',
      textAlign: 'center',
    },
    settingView: {
      marginTop: sw(12),
      marginRight: sw(40),
      marginBottom: sw(20),
      alignSelf: 'flex-end',
    },
    itemView: {
      width: sw(164),
      height: sw(200),
      backgroundColor: '#2A2A32',
      paddingVertical: sw(18),
      paddingHorizontal: sw(12),
      borderRadius: sw(20),
      margin: sw(15),
      shadowOpacity: 0.5,
      shadowRadius: 10,
      shadowOffset: { 0: 10 },
      shadowColor: '#000',
      elevation: 10,
    },
    itemTitle: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      marginBottom: sw(8),
    },
    itemContent: {
      ...Typography.ts(theme.fonts.weight.light, sw(16)),
      color: '#B6B6B6',
    },
    images: {
      width: sw(140),
      height: sw(80),
      marginVertical: sw(12),
      borderRadius: sw(10),
    },
    addNoteText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#2A2A32',
      marginTop: sw(46),
    },
    selectAllView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: sw(28),
      marginTop: sw(50),
      marginBottom: sw(8),
    },
    selectAllLeftView: {
      flexDirection: 'row',
    },
    selectAllText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(24)),
      color: '#FFEAA1',
      marginLeft: sw(8),
    },
    longPressImageView: {
      flexDirection: 'row',
      width: sw(100),
      height: sw(40),
      alignSelf: 'flex-end',
      backgroundColor: '#252525',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: sw(30),
      paddingHorizontal: sw(16),
    },
    longPressLineSeparator: {
      width: sw(2),
      height: sw(40),
      backgroundColor: '#2A2A32',
    },
    longPressCircleView: {
      position: 'absolute',
      right: 0,
      marginRight: sw(24),
      marginTop: sw(24),
    },
  });
};

export default NoteScreen;
