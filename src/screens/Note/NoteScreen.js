import React, { useEffect, useState } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

import AppPressable from '../../components/AppPressable';
import BaseHeader from '../../components/BaseHeader';
import Route from '../../navigations/Route';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const NoteScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const loadRecentNoteList = useStoreActions(
    (action) => action.user.loadRecentNoteList,
  );

  const recentNoteList = useStoreState((state) => state.user.recentNoteList);

  const [noteList, setNodeList] = useState(recentNoteList);

  useEffect(() => {
    console.log('recentNoteList in Note Screen:', recentNoteList);
    setNodeList(recentNoteList);
  }, [recentNoteList]);

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
      <AppPressable
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
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Notes</Text>
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
      alignItems: 'center',
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
  });
};

export default NoteScreen;
